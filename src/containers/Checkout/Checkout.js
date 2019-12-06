import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        
        for (let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ ingredients: ingredients, price: price });
    }

    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    continueOrderHandler = () => {
        this.props.history.push('/checkout/orderData');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    cancelOrder={this.cancelOrderHandler}
                    continueOrder={this.continueOrderHandler} />
                <Route 
                    path={this.props.match.url + '/orderData'} 
                    render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.price} {...props} />} 
                />
            </div>
        );
    }
};

export default Checkout;