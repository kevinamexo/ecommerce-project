import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import "./NavbarSearch.css";
import Product from "./Pages/Product/Product";

import { Link, useHistory, Route } from "react-router-dom";
const NavbarSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResultsMenu, setShowSearchResultsMenu] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
  };

  const history = useHistory();
  const navbarSearchInputRef = useRef();
  const resultsMenuRef = useRef();
  const searchMenuRef = useRef();

  const handleShowSearchResultsMenu = (e) => {
    if (navbarSearchInputRef.current.contains(e.target)) return;
    if (searchMenuRef.current.contains(e.target)) return;
    setShowSearchResultsMenu(false);
    setSearchResults([]);
  };

  useEffect(() => {
    console.log(searchTerm);
    let source = axios.CancelToken.source();

    const loadResults = async () => {
      try {
        if (searchTerm === "") return;
        const { data } = await axios.get(
          `http://localhost:8000/api/products/search?search_query=${searchTerm}`,
          {
            cancelToken: source.token,
          }
        );

        console.log(data.data);
        setSearchResults(data.data);
        setShowSearchResultsMenu(true);
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
  }, [searchTerm]);

  useEffect(() => {
    document.addEventListener("mousedown", handleShowSearchResultsMenu);
    document.addEventListener("click", handleShowSearchResultsMenu);

    return () => {
      document.removeEventListener("mousedown", handleShowSearchResultsMenu);
      document.removeEventListener("click", handleShowSearchResultsMenu);
    };
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        // ref={searchResultsMenuRef}
        className="navbarSearch"
      >
        <div className="navbarSearch-inputContainer">
          <input
            ref={navbarSearchInputRef}
            className="navbarSearch-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for Items..."
          />
          <div className="searchMenu" ref={searchMenuRef}>
            <ul className="searchMenu-results">
              {searchResults &&
                searchResults.map((item) => (
                  <li key={item._id} className="searchMenu-item">
                    <Link
                      onClick={() => setSearchResults([])}
                      to={`/product/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </form>
    </>
  );
};

export default NavbarSearch;
