import React from 'react';
import classes from './Hamburger.module.css';

const hamburger = (props) => (
    <div className={classes.Hamburger } onClick={props.click} >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default hamburger;