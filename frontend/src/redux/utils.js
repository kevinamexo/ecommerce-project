import React, { useEffect } from "react";
import { dispatch, useSelector } from "react-redux";

export const CalCartTotal = () => {
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(calcTotal());
  }, [cartItems]);
  const calcTotal = () => {
    {
      cartItems.reduce((prev, cur) => {
        return prev + cur.qty * cur.price;
      }, 0);
    }
  };
  return <p style={{ color: "red", display: "inline-block" }}>{calcTotal}</p>;
};
