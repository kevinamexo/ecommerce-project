import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";

//Get SelectedProduct details ACTION
import { getProductDetails as fetchProductDetails } from "../../../redux/actions/productActions";
import { addToCart } from "../../../redux/actions/cartActions";
const Product = () => {
  let { productId } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, product, error } = productDetails;

  const [quantity, setQuantity] = useState(1);

  //eventListeners

  const decrementQuantity = (e) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(0);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart(productId, quantity));
  };
  useEffect(() => {
    dispatch(fetchProductDetails(productId));
    console.log(product);
  }, [dispatch]);

  return (
    <div className="product-page">
      {!loading && product.data && (
        <>
          <div className="product-page__section1">
            <div className="product-page__imgContainer">
              <img src={product.data.imageUrl} />
            </div>
          </div>
          <div className="product-page__section2">
            <p className="product-page__productName">{product.data.name}</p>
            <p className="product-page__productDesc">
              {product.data.description}
            </p>
            <div className="product-page__addtoCart">
              <div className="product-page__addtoCart-quantity">
                <button onClick={decrementQuantity}>-</button>
                <input
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={(e) => setQuantity(quantity + 1)}>+</button>
              </div>
              <button
                className="product-page__addtoCart-addBtn"
                onClick={addToCartHandler}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
