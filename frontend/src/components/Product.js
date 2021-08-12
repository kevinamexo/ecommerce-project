import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import "./Product.css";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="productsPage-product">
      <div className="product__image-container">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-details">
        <Link to={`products/${product._id}`}>
          <p className="product-details__name line-clamp">{product.name}</p>
        </Link>

        <p className="product-details__desc">{product.description}</p>
        <span className="product-detail__buy">
          <h3>$ {product.price}</h3>
          <button
            className="product-detail__buyBtn"
            onClick={() => dispatch(addToCart(product._id, 1))}
          >
            Add to cart
          </button>
        </span>
      </div>
    </div>
  );
};

export default Product;
