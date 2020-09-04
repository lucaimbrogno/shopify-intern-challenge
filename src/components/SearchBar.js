import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ handleSearchChange }) => (
  <div className="box">
    <input
      className="search"
      type="text"
      placeholder="Search.."
      name="search"
      onChange={handleSearchChange}
    />
  </div>
);

SearchBar.propTypes = {
  handleSearchChange: PropTypes.func,
};

export default SearchBar;
