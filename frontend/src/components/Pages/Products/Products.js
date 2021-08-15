import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../Product";
import ProductPage from "../Product/Product";
import "./Products.css";

//Actionss
import { getProducts as listProducts } from "../../../redux/actions/productActions";

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  // const products = getProducts.products.data;
  // const loading = getProducts.loading;
  // const error = getProducts.error;
  const { loading, error, products } = getProducts;
  const { path } = useRouteMatch();

  useEffect(() => {
    dispatch(listProducts());
    console.log(products);
    console.log(loading);
  }, [dispatch]);

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          {loading ? (
            <h2>Loading</h2>
          ) : (
            <div className="productsPage">
              <h3>Products Page</h3>
              <div className="productSection-products">
                {products.data &&
                  !loading &&
                  products.data.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
            </div>
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default Products;
