import React, { useState, useEffect, useRef } from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addFromCart,
  removeFromCart,
} from "../redux/actions/cartActions";

const MiniCartItem = ({ item }) => {
  let q = item && item.qty ? item.qty : 1;
  const [qty, setQty] = useState(q);
  const quantityRef = useRef();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(addFromCart(item.product, quantityRef.current.value));
  }, [qty]);

  const handleQtyChange = (e) => {
    if (isNaN(e.target.value)) {
      setQty(0);
    }
    setQty(Number(e.target.value));
    dispatch(addFromCart(item.product, quantityRef.current.value));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.product));
  };

  return (
    <li className="navbar__cart-miniCart-item">
      <div className="navbar__cart-miniCart-itemImage">
        <img src={item.imageUrl} />
      </div>
      <span className="navbar__cart-details">
        <p>{item.name}</p>
        <p>${item.price}</p>
      </span>
      <span>
        <p className="navbar__cart-quantity-title">Qty</p>
        <span className="navbar__cart-quantity">
          <FaMinus
            className="navbar__cart-quantityMinus"
            onClick={() => setQty((prevQty) => prevQty - 1)}
            style={{ cursor: "pointer" }}
          />
          <input
            // type="number"
            className="navbar__cart-quantity"
            value={qty}
            ref={quantityRef}
            onChange={(e) => {
              handleQtyChange(e);
              console.log("changed");
            }}
          />
          <FaPlus
            className="navbar__cart-quantityAdd"
            onClick={() => setQty((prevQty) => prevQty + 1)}
            style={{ cursor: "pointer" }}
          />
        </span>
      </span>

      <div className="navbar__cart-removeFromCart">
        <FaTrashAlt onClick={handleRemoveFromCart} />
      </div>
    </li>
  );
};

export default MiniCartItem;
