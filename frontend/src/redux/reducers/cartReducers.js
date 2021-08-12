import * as actionTypes from "../constants/cartConstants";

const initialState = {
  cartItems: [],
  openCart: false,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);
      let currentAmount = existItem ? existItem.qty : 0;
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product
              ? { ...existItem, qty: currentAmount + item.qty }
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case actionTypes.OPEN_CART:
      return {
        ...state,
        openCart: action.payload,
      };

    default:
      return state;
  }
};
