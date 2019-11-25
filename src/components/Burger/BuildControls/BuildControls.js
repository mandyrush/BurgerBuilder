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
        {controls.map(ctrl => (
            <BuildControl label={ctrl.label} key={ctrl.label} />
        ))}
    </div>
);

export default buildControls;