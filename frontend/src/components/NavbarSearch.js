import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import "./NavbarSearch.css";
import SearchResultsMenu from "./SearchResultsMenu";

import { Link } from "react-router-dom";
const NavbarSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResultsMenu, setShowSearchResultsMenu] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
  };

  // const searchResultsMenuRef = useRef();
  const navbarSearchInputRef = useRef();

  const handleShowSearchResultsMenu = (e) => {
    // if (searchResultsMenuRef.current.contains(e.target)) return;
    if (navbarSearchInputRef.current.contains(e.target)) return;

    setShowSearchResultsMenu(false);
  };

  useEffect(() => {
    console.log(searchTerm);
    let source = axios.CancelToken.source();

    const loadResults = async () => {
      try {
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
  return (
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

        {showSearchResultsMenu ? (
          <div className="searchMenu">
            <ul className="searchMenu-results">
              {searchResults &&
                searchResults.map((item) => (
                  <Link to={`products/${item._id}`}>
                    <li key={item._id} className="searchMenu-item">
                      {item.name}
                    </li>
                  </Link>
                ))}
            </ul>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default NavbarSearch;
