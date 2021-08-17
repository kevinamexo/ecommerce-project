import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import Products from "./components/Pages/Products/Products";
import ProductPage from "./components/Pages/Product/Product";

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
      </Switch>
    </div>
  );
};

export default App;
