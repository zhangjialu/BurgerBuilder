import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  closeSideDrawerHandler = () => {
    this.setState({showSideDrawer: false})
  }

  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return {showSideDrawer: !prevState.showSideDrawer};
    })
  }

  render () {
    return (
      <Fragment>
        <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} isAuth={this.props.isAuth} />
        <SideDrawer open={this.state.showSideDrawer} close={this.closeSideDrawerHandler} isAuth={this.props.isAuth} />
        <main className={classes.Content}>{ this.props.children }</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);