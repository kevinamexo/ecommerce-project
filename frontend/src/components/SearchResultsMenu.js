import React, { useEffect, useRef } from "react";
import "./SearchResultsMenu.css";

const SearchResultsMenu = ({ data }) => {
  const searchResultsMenuRef = useRef();

  const handleShowSearchResultsMenu = (e) => {
    if (searchResultsMenuRef.contains(e.target)) return;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleShowSearchResultsMenu);

    return () => {
      document.removeEventListener("mousedown", handleShowSearchResultsMenu);
    };
  }, []);

  return (
    <div className="searchMenu" ref={searchResultsMenuRef}>
      <ul>{data && data.map((item) => <li>{item.name}</li>)}</ul>
    </div>
  );
};

export default SearchResultsMenu;
