import React from 'react';
import classes from './SideDrawerToggler.css'

const SideDrawerToggler = props => (
  <div className={classes.SideDrawerToggler} onClick={props.clicked}>
    <div />
    <div />
    <div />
  </div>
);

export default SideDrawerToggler;