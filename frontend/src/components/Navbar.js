import React from "react";

import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

import MiniCart from "./MiniCart";
import "./Navbar.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { showCart, calcTotalItem } from "../redux/actions/cartActions";
const Navbar = () => {
  const { openCart, cartItems } = useSelector((state) => state.cart);
  console.log(openCart);
  console.log(cartItems);
  const dispatch = useDispatch();

  const handleCartIconClick = () => {
    dispatch(showCart());
  };

  const cartItemsTotal = cartItems.reduce((prev, cur) => {
    return prev + cur.qty;
  }, 0);

  const cartTotal = cartItems.reduce((prev, cur) => {
    return prev + cur.qty * cur.price;
  }, 0);

  return (
    <div className="navbar">
      <div className="navbar__logo-section">
        <Link>
          <h3>The Online Store</h3>
        </Link>
      </div>
      <ul className="navbar__navItems">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li className="navbar__cart">
          <Link to="/cart">Cart</Link>
          <FiShoppingCart className="cartIcon" onClick={handleCartIconClick} />
          {cartItemsTotal > 0 && (
            <span className="navbar__cart-total">{cartItemsTotal}</span>
          )}
        </li>
      </ul>
      {openCart && (
        <MiniCart cartItemsTotal={cartItemsTotal} cartTotal={cartTotal} />
      )}
    </div>
  );
};

export default Navbar;
