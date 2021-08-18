import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import Products from "./components/Pages/Products/Products";
import Admin from "./components/Pages/Admin/Admin";
import ProductPage from "./components/Pages/Product/Product";
import CartPage from "./components/Pages/CartPage/CartPage";

import { Switch, Route } from "react-router-dom";

import { useSelector } from "react-redux";

const App = () => {
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    console.log(cartItems);
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:productId" component={ProductPage} />
        <Route exact path="/products" component={Products} />
        <Route path="/admin" component={Admin} />
        <Route path="/cart" component={CartPage} />
        <Route exact path="/admin/:page" component={Admin} />
      </Switch>
    </div>
  );
};

export default App;
