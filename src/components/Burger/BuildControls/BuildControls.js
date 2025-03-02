import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls} >
        <p><strong>Current Price: {props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                label={ctrl.label} 
                key={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchaseable} 
            onClick={props.ordered}>
                {props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
        </button>
    </div>
);

export default buildControls;