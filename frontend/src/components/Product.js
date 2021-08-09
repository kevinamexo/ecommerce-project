import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="productsPage-product">
      <div className="product__image-container">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-details">
        <p className="product-details__name line-clamp">{product.name}</p>

        <p className="product-details__desc">{product.description}</p>
        <span className="product-detail__buy">
          <h3>$ {product.price}</h3>
          <button className="product-detail__buyBtn">Add to cart</button>
        </span>
      </div>
    </div>
  );
};

export default Product;
