import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";

const Product = ({ product }) => {
  const { url, path } = useRouteMatch();
  const { id } = useParams();

  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  );
};

export default Product;
