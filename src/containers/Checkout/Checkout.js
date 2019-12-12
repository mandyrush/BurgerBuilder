import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
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
                    ingredients={this.props.ingredients} 
                    cancelOrder={this.cancelOrderHandler}
                    continueOrder={this.continueOrderHandler} />
                <Route 
                    path={this.props.match.url + '/orderData'} 
                    component={ContactData} /> 
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(Checkout);