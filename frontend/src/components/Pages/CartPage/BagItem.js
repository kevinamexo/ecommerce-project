import React from "react";
import "./BagItem.css";
import { AiOutlineClose, AiFillHeart } from "react-icons/ai";
import { FcLikePlaceholder } from "react-icons/fc";

const BagItem = ({ item }) => {
  return (
    <div className="checkOut-bagItem">
      <div className="checkOut-bagItem-imgContainer">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <div className="checkOut-bagItem-details">
        <h3 className="checkOut-bagItem__itemPrice">${item.price}</h3>
        <p className="checkOut-bagItem__itemName">{item.name}</p>
        <span className="checkOut-bagItem-save">
          <span>
            <AiFillHeart className="checkOut-bagItem__saveButton" />
            <p>Save this item for later</p>
          </span>
          <span className="checkOut-bagItem__qty">
            <p style={{ fontWeight: "bold" }}>QTY</p>
            <p>{item.qty}</p>
          </span>
        </span>
        <AiOutlineClose className="checkOut-bagItem__removeItem" />
      </div>
    </div>
  );
};

export default BagItem;
