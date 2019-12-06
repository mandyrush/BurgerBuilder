import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingredientItem = [];

    for(let item in props.ingredients) {
        ingredientItem.push({
            name: item,
            amount: props.ingredients[item]
        })
    }

    const ingredient = ingredientItem.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name} >{ig.name} ({ig.amount})</span>
    })

    return (
        <div className={classes.Order} >
            <p>Ingredients: {ingredient}</p>
            <p>Total Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;