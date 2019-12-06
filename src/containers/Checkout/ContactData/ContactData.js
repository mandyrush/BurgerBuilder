import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        contactData: {
            name: '',
            email: '',
            address: {
                street: '',
                zipcode: ''
            }
        },
        loading: false
    };

    submitOrderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Amanda Rush',
                address: {
                    street: '123 ABC Street',
                    city: 'Raleigh',
                    state: 'NC',
                    zipcode: 27612,
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => 
                { this.setState({ loading: false }); 
            });
    }

    render() {
        let form = (
            <form>
                <input name='name' type='text' placeholder='Name' />
                <input name='email' type='email' placeholder='Email' />
                <input name='street' type='text' placeholder='street' />
                <input name='zipcode' type='text' placeholder='zipcode' />
                <Button btnType='Success' clicked={this.submitOrderHandler} >Order</Button>
            </form>
        );

        if(this.state.loading) {
            form = (<Spinner />)
        }
        return (
            <div className={classes.ContactData}>
                <h2>Please Enter your information.</h2>
                {form}
            </div>
        );
    }
};

export default ContactData;