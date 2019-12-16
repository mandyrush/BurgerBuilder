import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount () {
        this.props.onInitOrders();
    }

    render() {
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = (
                this.props.orders.map(order => (
                    <Order 
                        key={order.id} 
                        price={+order.price} 
                        ingredients={order.ingredients} />
                ))
            );
        }
        return (
            <div style={{width: '80%', margin: 'auto'}}>
                <h1>Your Orders</h1>
                {orders}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));