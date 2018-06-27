import React, { Fragment } from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = props => {
  const attachedClass = [classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ')
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.close} />
      <div className={attachedClass} onClick={props.close}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
