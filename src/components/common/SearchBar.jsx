import React from "react";
import PropTypes from "prop-types";
import Button from "./Button.jsx";
import IconButton from "./IconButton.jsx";

const SearchBar = ({
  label,
  onSearch = () => {
    console.log("search event is not defined");
  },
  className = "",
  inputStyle = "",
  buttonStyle = "",
}) => {
  const search = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    onSearch(keyword);
    e.target.keyword.value = "";
  };

  const formClassList = `flex w-full ${className}`;
  const inputClassList = `w-full ${inputStyle}`;
  const buttonClassList = `${buttonStyle}`;

  return (
    <form onSubmit={(e) => search(e)} className={formClassList}>
      <input type="text" name="keyword" className={inputClassList} />
      <IconButton
        icon={<i className="fa-solid fa-magnifying-glass"></i>}
        type="submit"
        label={label}
        size="sm"
        className={buttonClassList}
        onClick={() => {}}
      />
    </form>
  );
};

SearchBar.propTypes = {
  label: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
  inputStyle: PropTypes.string,
  buttonStyle: PropTypes.string,
};

export default SearchBar;
