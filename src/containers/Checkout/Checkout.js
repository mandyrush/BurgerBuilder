import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to='/' />

        if(this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
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
        return summary;
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);