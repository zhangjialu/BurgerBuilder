import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICE = {
  meat: 1.3,
  cheese: 0.4,
  salad: 0.5,
  bacon: 0.7
}

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 4,
  building: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building: true
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          meat: action.ingredients.meat,
          cheese: action.ingredients.cheese,
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon
        },
        totalPrice: 4,
        building: false,
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
};

export default reducer;
