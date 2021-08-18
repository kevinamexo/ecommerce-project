import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import NavbarSearch from "./NavbarSearch";

import MiniCart from "./MiniCart";
import "./Navbar.css";

//redux
import { useSelector, useDispatch } from "react-redux";
import { showCart, calcTotalItem } from "../redux/actions/cartActions";
const Navbar = () => {
  const { openCart, cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const history = useHistory();
  const handleCartIconClick = () => {
    dispatch(showCart());
  };

  const cartItemsTotal = cartItems.reduce((prev, cur) => {
    return prev + cur.qty;
  }, 0);

  const cartTotal = cartItems.reduce((prev, cur) => {
    return prev + cur.qty * cur.price;
  }, 0);

  const searchResultsMenuRef = useRef();

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleShowSearchResultsMenu);

  //   return () => {
  //     document.removeEventListener("mousedown", handleShowSearchResultsMenu);
  //   };
  // }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResultsMenu, setShowSearchResultsMenu] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
  };

  const navbarSearchInputRef = useRef();
  const resultsMenuRef = useRef();

  useEffect(() => {
    console.log(searchTerm);
    let source = axios.CancelToken.source();

    const loadResults = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/products/search?search_query=${searchTerm}`,
          {
            cancelToken: source.token,
          }
        );

        console.log(data.data);
        setSearchResults(data.data);
        setShowSearchResultsMenu(true);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("caught cancel");
        } else {
          throw error;
        }
      }
    };
    loadResults();

    return () => {
      source.cancel();
    };
  }, [searchTerm]);

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleShowSearchResultsMenu);
  //   document.addEventListener("click", handleShowSearchResultsMenu);

  //   return () => {
  //     document.removeEventListener("mousedown", handleShowSearchResultsMenu);
  //     document.removeEventListener("click", handleShowSearchResultsMenu);
  //   };
  // }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="navbar">
      <div className="navbar__logo-section">
        <Link to="/">
          <h3 className="navbar-title">The Online Store</h3>
        </Link>
      </div>

      <NavbarSearch />
      {/* <SearchResultsMenu /> */}

      <ul className="navbar__navItems">
        <li className="navbar-link">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-link">
          <Link to="/admin">ADMIN</Link>
        </li>
        <li className="navbar-link">
          <Link to="/products">Products</Link>
        </li>
        <li className="navbar__cart">
          <Link to="/cart" className="navbar-link">
            Cart
          </Link>
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
