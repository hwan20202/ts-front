import React from "react";
import PropTypes from "prop-types";

const styles = {
  select:
    "leading-none outline-none ring-0 focus:ring-0 focus:outline-non hover:cursor-pointer",
  text: "text-xs text-white text-center",
};

const Dropdown = ({ options, defaultValue, onChange, className }) => {
  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => {
        console.log(e.target.value);
        onChange(e.target.value);
      }}
      className={`${styles.select} ${styles.text} ${className}`}
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
