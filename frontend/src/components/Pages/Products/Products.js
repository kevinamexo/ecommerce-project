import React, { useEffect } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../Product";
import "./Products.css";

//Actions
import { getProducts as listProducts } from "../../../redux/actions/productActions";

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const products = getProducts.products.data;
  const loading = getProducts.loading;
  const { path, url } = useRouteMatch();
  useEffect(() => {
    dispatch(listProducts());
    console.log(products);
    console.log(loading);
  }, [dispatch]);

  return (
    <div>
      <Route exact path={path}>
        <div className="productsPage">
          <h3>Products Page</h3>
          <div className="productSection-products">
            {products &&
              !loading &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </div>
      </Route>
      <Route exact path={`${path}/:id`}>
        <Product />
      </Route>
    </div>
  );
};

export default Products;
