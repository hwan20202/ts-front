import React from "react";
import PropTypes from "prop-types";

const RadioButton = ({ label, onClick, className = "", disabled = false }) => {
  const classList = `
    w-auto whitespace-nowrap leading-[0] m-0.5 px-4 py-3 bg-white border-4 border-gray-100 rounded-full text-gray-700 text-sm
    hover:bg-gray-100 focus:bg-blue-500 focus:text-white
    active:bg-blue-600 transition-colors
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  const handleBtnClick = (e) => {
    e.preventDefault();
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button className={classList} onClick={handleBtnClick} disabled={disabled}>
      {label}
    </button>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

const RadioOptions = ({
  options,
  onBtnClick,
  allowDuplicates = true,
  selectedOptions = [],
}) => {
  const handleBtnClick = (op) => {
    if (allowDuplicates || !selectedOptions.includes(op)) {
      onBtnClick(op);
    }
  };

  return (
    <div className="flex flex-wrap w-full justify-start p-2">
      {options.length > 0 &&
        options.map((op, index) => (
          <RadioButton
            key={index}
            label={op}
            onClick={() => handleBtnClick(op)}
            disabled={selectedOptions.includes(op)}
          />
        ))}
    </div>
  );
};

RadioOptions.propTypes = {
  options: PropTypes.array.isRequired,
  onBtnClick: PropTypes.func,
  allowDuplicates: PropTypes.bool,
  selectedOptions: PropTypes.array,
};

export default RadioOptions;
