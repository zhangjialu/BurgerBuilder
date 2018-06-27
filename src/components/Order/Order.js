import React from 'react';
import classes from './Order.css';

const Order = props => {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({name: ingName, amount: props.ingredients[ingName]});
  }

  const OutputIngredients = ingredients.map(ing => {
    return (
      <span 
        key={ing.name} 
        style={{
          textTransform: 'capitalize', 
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'}}
      >{ing.name} ({ing.amount})</span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {OutputIngredients}</p>
      <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
}

export default Order;