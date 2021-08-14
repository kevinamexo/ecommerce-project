import React from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { CalCartTotal } from "../redux/utils";
import "./MiniCart.css";
import MiniCartItem from "./MiniCartItem";
const MiniCart = ({ cartItemsTotal, cartTotal }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const cartPriceTotal = cartItems.reduce((prev, cur) => {
    return prev + cur.qty * cur.price;
  }, 0);

  return (
    <div className="navbar__cart-miniCart">
      <header style={cartItems.length === 0 ? { borderBottom: "0px" } : {}}>
        <span>
          <FaShoppingCart className="navbar__cart-miniCartIcon" />
          {cartItemsTotal > 0 && (
            <div className="navbar__cart-miniCartTotal">{cartItemsTotal}</div>
          )}
        </span>

        <span className="navbar__cart-miniCart-total">
          <p>Total:</p>
          <h3>$ {cartPriceTotal}</h3>
        </span>
      </header>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <MiniCartItem item={item} />)
        ) : (
          <p style={{ color: "black", textAlign: "center" }}>
            No items in cart
          </p>
        )}
      </ul>

      <footer></footer>
    </div>
  );
};

export default MiniCart;
