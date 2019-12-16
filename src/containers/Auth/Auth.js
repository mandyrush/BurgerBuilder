import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        loginForm: {
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
        formIsValid: false
    };

    checkValidationHandler = (rules, value) => {
        let isValid = true; 

        if(rules.required) {
            isValid= value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, id) => {
        const updatedLoginForm = {...this.state.loginForm};
        const updatedElement = {...updatedLoginForm[id]};
        
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidationHandler(updatedElement.validation, updatedElement.value)
        
        updatedElement.touched = true;
        updatedLoginForm[id] = updatedElement;

        let formIsValid = true;
        for(let element in updatedLoginForm) {
            formIsValid = updatedLoginForm[element].valid && formIsValid;
        }

        this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid });
    }

    render() {
        let formArray = [];

        for(let key in this.state.loginForm) {
            formArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

         let form = (
             <form>
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
                <Button btnType="Success" >SUBMIT</Button>
             </form>
         );

        return (
            <div className={classes.Auth}>
                <h1>Login</h1>
                {form}
            </div>
        );
    }
}

export default Auth;