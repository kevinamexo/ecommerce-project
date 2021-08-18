import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import BagItem from "./BagItem";
import { IoIosArrowBack } from "react-icons/io";
import "./CartPage.css";

const shippingOptions = [
  { value: "stdDelivery", label: "Standard Delivery (Free)" },
  { value: "expressDelivery", label: "Express Delivery" },
];

const CartPage = () => {
  const [shippingOption, setShippingOption] = useState({
    value: "",
    label: "",
  });
  const [shippingOptionError, setShippingOptionError] = useState("");
  const { cartItems } = useSelector((state) => state.cart);

  const cartPriceTotal = cartItems.reduce((prev, cur) => {
    return prev + cur.qty * cur.price;
  }, 0);

  useEffect(() => {
    console.log(cartItems);
    console.log(cartPriceTotal);
  }, []);

  const submitCheckoutProducts = (e) => {
    e.preventDefault();
    if (
      shippingOption.value !== "stdDelivery" ||
      shippingOption.value !== "expressDelivery"
    ) {
      return setShippingOptionError("Please select a Shipping Option");
    }
  };
  return (
    <div className="cart-page">
      <header>Shopping Cart</header>
      <main className="cart-page__body">
        <div className="cart-page__bag">
          <div className="cart-page__bag-header">
            <h2>MY BAG</h2>
            <p>Products are reserved for 60 minutes</p>
          </div>
          <div className="cart-page__bag-main">
            {cartItems.length > 0 ? (
              cartItems.map((item) => <BagItem key={item._id} item={item} />)
            ) : (
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.5em",
                  textAlign: "center",
                  marginTop: "25%",
                }}
              >
                No Items in Cart
              </p>
            )}
          </div>
          <Link to="/products">
            <button
              style={{
                position: "absolute",
                right: "15px",
                bottom: "15px",
                padding: "10px",
                backgroundColor: "rgb(0, 128, 38)",
                borderRadius: "5px",
                color: "#fff",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <IoIosArrowBack />
                Return to Products Page
              </span>
            </button>
          </Link>
        </div>

        <div className="cart-page__checkOut">
          <div className="cart-page__checkOut-header">
            <h2>TOTAL</h2>
          </div>
          <div className="cart-page__checkOut-main">
            <div className="cart-page__checkOut-main__subtotal">
              <p className="cart-page__checkOut-main__subtotalTitle">
                Sub-total
              </p>
              <p className="cart-page__checkOut-main__subtotalAmount">
                ${cartPriceTotal}
              </p>
            </div>
            <div className="cart-page__checkOut-main__delivery">
              <p className="cart-page__checkOut-main__deliveryTitle">
                Delivery:
              </p>
              <p className="cart-page__checkOut-main__deliveryAmount">
                {shippingOption.value === "expressDelivery"
                  ? "$25"
                  : shippingOption.value === "stdDelivery"
                  ? "Free"
                  : null}
              </p>
            </div>
            <form onSubmit={submitCheckoutProducts}>
              <Select
                className="cart-page__selectDelivery"
                options={shippingOptions}
                value={shippingOption}
                isDisabled={cartItems.length <= 0}
                onChange={(value) => {
                  setShippingOption(value);
                  console.log(value);
                  setShippingOptionError("");
                }}
                isSearchable={false}
              />
            </form>
            {shippingOptionError && (
              <p className="error">{shippingOptionError}</p>
            )}
            <button className="cart-page__checkOutSubmit">CHECKOUT</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
