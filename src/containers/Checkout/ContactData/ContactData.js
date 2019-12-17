import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
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
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    };

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

    submitOrderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const orderDetails = {};

        for(let formElementIdentifier in this.state.orderForm) {
            orderDetails[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        };

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDetails: orderDetails
        };

        this.props.onPurchaseBurger(order, this.props.token);
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedElement = {...updatedOrderForm[inputIdentifier]};
        
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidationHandler(updatedElement.validation, updatedElement.value);
        
        updatedElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        };

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    };

    render() {
        let formArray = [];

        for (let key in this.state.orderForm) {
            formArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        };

        let form = (
            <form onSubmit={this.submitOrderHandler}>
                {formArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid} >
                    ORDER
                </Button>
            </form>
        );

        if(this.props.loading) {
            form = (<Spinner />);
        };
        return (
            <div className={classes.ContactData}>
                <h2>Please Enter your information.</h2>
                {form}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseBurger: (orderData, token) => dispatch (actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));