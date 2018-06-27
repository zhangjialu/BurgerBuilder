import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchase: false
  }

  componentDidMount () {
    // if (!this.props.ings) {
    //   this.props.onInitIngredients();
    // }
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum += el, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({purchase: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    } 
  }

  purchaseCancelledHandler = () => {
    this.setState({purchase: false});
  }

  purchaseContinuedHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null; 
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (this.props.ings){
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled = {disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuth} />
        </Fragment>
      );
      orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        orderCancelled={this.purchaseCancelledHandler}
        orderContinued={this.purchaseContinuedHandler}
        price={this.props.price} />;
      }

    return (
      <Fragment>
        <Modal show={this.state.purchase} modalClosed={this.purchaseCancelledHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  };
}

const mapDispachToProps = dispach => {
  return {
    onIngredientAdded: (ingName) => dispach(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispach(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispach(actions.initIngredients()),
    onInitPurchase: () => dispach(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispach(actions.setAuthRedirectPath(path))
  };
}

export default connect(mapStateToProps, mapDispachToProps)(withErrorHandler(BurgerBuilder, axios));