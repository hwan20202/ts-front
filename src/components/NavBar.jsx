import React from "react";
import PropTypes from "prop-types";
import renderElement from "../utils/renderElement.jsx";

const NavBar = ({ className, buttons = [] }) => {
  const classList = `
    fixed bottom-0 left-0
    w-full max-w-body py-3 px-2
    grid grid-cols-${buttons.length}
    text-xl font-bold
    bg-gray-400  
    
    ${className}
    `;

  return (
    <div className={classList}>
      {buttons.map((button, index) => (
        <React.Fragment key={index}>{renderElement(button)}</React.Fragment>
      ))}
    </div>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
  ).isRequired,
};

export default NavBar;
