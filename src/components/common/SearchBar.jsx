import React from "react";
import PropTypes from "prop-types";

const styles = {
  form: "flex w-full",
  input:
    "outline-none w-full bg-white border border-gray-300 rounded-sm px-2 mr-1 text-sm font-semibold text-gray-500",
  inputFocus: "focus:border focus:border-green-300 focus:bg-gray-50",
  button: "outline-none text-green-300 border-gray-300 border p-2 rounded-sm",
  buttonFocus:
    "focus:border focus:border-green-300 focus:bg-green-300 focus:text-white focus:font-bold",
};

const SearchBar = ({
  onSearch = () => {
    console.log("search event is not defined");
  },
}) => {
  const search = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    onSearch(keyword);
    e.target.keyword.value = "";
  };

  return (
    <form onSubmit={(e) => search(e)} className={styles.form}>
      <input
        type="text"
        name="keyword"
        autoComplete="off"
        className={`${styles.input} ${styles.inputFocus}`}
      />
      <button
        type="submit"
        className={`${styles.button} ${styles.buttonFocus}`}
        onClick={() => {}}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
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
