import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ManageStock.css";
import Select from "react-select";

const options = [
  { value: "addToStock", label: "Add to Stock" },
  { value: "removeFromStock", label: "Remove from Stock" },
];

const ManageStock = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState(null);
  const [productStock, setProductStock] = useState(null);
  const [prevStockAmount, setPrevStockAmount] = useState(null);
  const [productSearchResults, setProductSearchResults] = useState([]);
  const [showProductSearchResults, setShowProductSearchResults] =
    useState(true);
  const [productSelected, setProductSelected] = useState(false);
  const [stockAmount, setStockAmount] = useState(1);
  const [stockOpSuccess, setStockOpSuccess] = useState(false);
  const [stockOpMessage, setStockMessage] = useState(0);
  //   const [stockOpMessa, setStockMessage] = useState(0);

  const [actionError, setActionError] = useState("");
  const [productError, setProductError] = useState("");
  const [amountError, setAmountError] = useState("");

  const [successfulUpdate, setSuccessfulUpdate] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  useState(true);

  const handleProductNameChange = (e) => {
    setProductSelected(false);
    setProductName(e.target.value);
    setShowProductSearchResults(true);
  };
  const productSearchMenuRef = useRef();

  useEffect(() => {
    console.log(productName);
    let source = axios.CancelToken.source();

    const loadResults = async () => {
      if (productName === "") setShowProductSearchResults(false);
      try {
        if (productName === "") return;
        const { data } = await axios.get(
          `http://localhost:8000/api/products/search?search_query=${productName}`,
          {
            cancelToken: source.token,
          }
        );

        console.log(data.data);
        setProductSearchResults(data.data);
        // setShowProductSearchResults(true);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("caught cancel");
        } else {
          throw error;
        }
      }
    };
    loadResults();

    return () => {
      source.cancel();
    };
  }, [productName]);

  const handleManageStockSubmit = async (e) => {
    e.preventDefault();

    setSuccessfulUpdate(false);
    setSuccessMessage("");
    if (!productSelected) setProductError("product not Select");
    if (
      selectedAction.value !== "addToStock" &&
      selectedAction.value !== "removeFromStock"
    ) {
      setProductError("Select a valid action");
    }
    if (stockAmount < 1) setProductError("Select a valid amount");
    if (productSelected && selectedAction !== null && stockAmount > 0) {
      console.log("correct");
    }
    const update = await axios.put(
      `http://localhost:8000/api/products/${productId}?type=${selectedAction.value}&amount=${stockAmount}`
    );
    console.log(update);
    if (update.data.success) {
      setSuccessfulUpdate(true);
      setSuccessMessage(
        `Updated ${update.data.data.name} to ${update.data.data.countInStock}`
      );
    }
  };

  return (
    <div className="manageStock">
      <header>
        <h2>Manage Stock</h2>
      </header>
      <form className="manageStockForm" onSubmit={handleManageStockSubmit}>
        <div className="form-group">
          <p className="form-group__label">Select Action :</p>

          <Select
            options={options}
            value={selectedAction}
            onChange={(value) => {
              setSelectedAction(value);
              console.log(value);
              setActionError("");
            }}
          />
        </div>
        <div className="form-group">
          <p className="form-group__label">Enter Product Name: </p>
          <input
            type="text"
            className="manageStockForm__productNameInput"
            value={productName}
            disabled={selectedAction === null}
            onChange={handleProductNameChange}
          />
          {showProductSearchResults && (
            <div
              className={
                showProductSearchResults ? "productSearchMenu" : "hidden"
              }
              ref={productSearchMenuRef}
            >
              <ul className="productSearchMenu-results">
                {productSearchResults &&
                  productSearchResults.map((item) => (
                    <li
                      key={item._id}
                      onClick={async () => {
                        // setPrevStockAmount(null);
                        setShowProductSearchResults(false);
                        setProductName(item.name);
                        setProductId(item._id);

                        setProductSelected(true);
                      }}
                      className="productSearchMenu-item"
                    >
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <div className="form-group">
          <p className="form-group__label">Amount :</p>
          <input
            value={stockAmount}
            type="number"
            min={0}
            onChange={(e) => {
              setStockAmount(e.target.value);
            }}
            disabled={!productSelected}
          />
        </div>
        <button className="manageStock-submit" type="submit">
          Submit
        </button>
      </form>
      {actionError !== "" && <p className="error">{actionError}</p>}
      {productError && <p className="error">{productError}</p>}
      {amountError && <p className="error">{amountError}</p>}
      {successMessage !== null && successMessage !== "" && (
        <p className="success">{successMessage}</p>
      )}
    </div>
  );
};

export default ManageStock;
