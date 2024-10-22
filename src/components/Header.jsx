import React from "react";
import PropTypes from "prop-types";
import renderElement from "../utils/renderElement.jsx";

const Header = (
    {
        first,
        second,
        third,
        className,
    }) => {

    const combinedClass = `
    fixed top-0 left-0
    w-full max-w-body py-3 px-2
    grid grid-cols-3 gap-2
    text-xl font-bold
    bg-gray-400  
    
    ${className}
    `

    return (
        <div className={combinedClass}>
            {renderElement(first)}
            {renderElement(second)}
            {renderElement(third)}
        </div>
    );
}

Header.propTypes = {
    first: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]).isRequired,
    second: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]).isRequired,
    third: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]).isRequired,
    className: PropTypes.string,
};

export default Header;