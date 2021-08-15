import * as actionTypes from "../constants/cartConstants";

const initialState = {
  cartItems: [],
  openCart: false,
  cartTotal: 0,
  cartItemsTotal: 0,
};

export const cartReducer = (state = initialState, action) => {
  let productId;
  let cartItems;
  let item;
  let cartItem;
  let existItem;
  let currentAmount;
  let newQty;
  let newItem;
  let replacedQty;
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      item = action.payload;

      existItem = state.cartItems.find((x) => x.product === item.product);
      currentAmount = existItem ? existItem.qty : 0;
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product
              ? { ...existItem, qty: currentAmount + item.qty }
              : x
          ),
          cartTotal: state.cartTotal + item.qty,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case actionTypes.ADD_FROM_CART:
      productId = action.payload.product;
      let quantity = action.payload.qty;
      console.log(productId, quantity);

      let replacedQty = {
        ...state.cartItems.find((prod) => prod.product === productId),
        qty: Number(quantity),
      };

      return {
        ...state,
        cartItems: [
          ...state.cartItems.map((x) =>
            x.product === replacedQty.product ? replacedQty : x
          ),
        ],
        cartTotal: state.cartTotal + quantity,
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
        cartTotal: state.cartItems.reduce((prev, cur) => {
          return prev + cur.qty;
        }),
      };

    case actionTypes.INCREASE_ITEM:
      productId = action.payload;

      existItem = state.cartItems.find((x) => x.product === productId);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product
              ? { ...existItem, qty: existItem.qty + 1 }
              : x
          ),
          cartTotal: state.cartTotal + quantity,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          cartTotal: state.cartTotal + quantity,
        };
      }

    case actionTypes.DECREASE_ITEM:
      productId = action.payload;
      replacedQty = state.cartItems.find((prod) => prod.product === productId);

      newQty = replacedQty.qty > 0 ? replacedQty.qty - 1 : 0;

      newItem = { ...replacedQty, qty: newQty };

      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
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
