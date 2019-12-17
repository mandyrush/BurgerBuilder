import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    };

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidationHandler = (rules, value) => {
        let isValid = true; 

        if(rules.required) {
            isValid= value.trim() !== '' && isValid;
        };

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        };

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        };

        return isValid;
    };

    inputChangedHandler = (event, id) => {
        const updatedAuthForm = {...this.state.authForm};
        const updatedElement = {...updatedAuthForm[id]};
        
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidationHandler(updatedElement.validation, updatedElement.value);
        
        updatedElement.touched = true;
        updatedAuthForm[id] = updatedElement;

        let formIsValid = true;
        for(let element in updatedAuthForm) {
            formIsValid = updatedAuthForm[element].valid && formIsValid;
        };

        this.setState({ authForm: updatedAuthForm, formIsValid: formIsValid });
    };

    authFormHandler = (event) => {
        event.preventDefault();
        this.props.onUserAuthenticate(
            this.state.authForm.email.value, 
            this.state.authForm.password.value,
            this.state.isSignUp
        );
    };

    toggleAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    };

    render() {
        let formArray = [];

        for(let key in this.state.authForm) {
            formArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        };

        let form = (
            <form onSubmit={this.authFormHandler}>
                {formArray.map(field => (
                <Input
                    key={field.id}
                    elementType={field.config.elementType}
                    elementConfig={field.config.elementConfig}
                    value={field.config.value}
                    invalid={!field.config.valid}
                    touched={field.config.touched}
                    shouldValidate={field.config.validation}
                    changed={(event) => this.inputChangedHandler(event, field.id)} />
            ))}
            <Button 
                btnType="Success" 
                type="Submit">
                    SUBMIT
                </Button>
            <Button 
                btnType="Danger" 
                clicked={this.toggleAuthModeHandler}>
                {this.state.isSignUp ? 'LOGIN' : 'REGISTER'}
            </Button>
            </form>
        );

         if(this.props.loading) {
            form = (<Spinner />);
         };

         let errorMessage = null;
         if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
         };

        let authRedirect = null;
        if(this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        };

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <h1>{this.state.isSignUp ? 'REGISTER' : 'LOGIN'}</h1>
                {form}
                {errorMessage}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserAuthenticate: (email, password, isSignUp) => {dispatch(actions.auth(email, password, isSignUp))},
        onSetAuthRedirectPath: () => {dispatch(actions.setAuthRedirectPath('/'))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);