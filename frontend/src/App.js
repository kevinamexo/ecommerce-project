import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import Products from "./components/Pages/Products/Products";
import Product from "./components/Pages/Product/Product";

import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={Product} />
      </Switch>
    </div>
  );
};

export default App;
