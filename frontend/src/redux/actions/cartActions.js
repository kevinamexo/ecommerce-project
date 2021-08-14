import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  let { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
  data = data.data;

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty,
    },
  });

  dispatch({
    type: actionTypes.CALCULATE_TOTAL,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart));
};

export const addFromCart = (id, qty) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.ADD_FROM_CART,
    payload: {
      product: id,
      qty: qty,
    },
  });

  dispatch({
    type: actionTypes.CALCULATE_TOTAL,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cartItems));
};

export const showCart = (id) => (dispatch, getState) => {
  const { openCart } = getState().cart;
  console.log(openCart);
  dispatch({ type: actionTypes.OPEN_CART, payload: !openCart });
};

export const increaseQty = (id) => (dispatch, getState) => {
  dispatch({ type: actionTypes.INCREASE_ITEM, payload: id });
};
export const decreaseQty = (id) => (dispatch, getState) => {
  dispatch({ type: actionTypes.DECREASE_ITEM, payload: id });
};
