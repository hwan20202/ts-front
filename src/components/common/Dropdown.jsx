import React from "react";
import PropTypes from "prop-types";

const styles = {
  select:
    "w-full bg-orange-500 border border-gray-300 rounded-md leading-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-orange-300 hover:cursor-pointer",
  text: "text-xs text-white text-center",
};

const Dropdown = ({ options, defaultValue, onChange }) => {
  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => {
        console.log(e.target.value);
        onChange(e.target.value);
      }}
      className={`${styles.select} ${styles.text}`}
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
