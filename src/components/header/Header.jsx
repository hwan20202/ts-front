import React from "react";
import PropTypes from "prop-types";
import renderElement from "../../utils/renderElement.jsx";

const styles = {
  text: "text-md font-bold text-white",
  container: {
    base: "grid grid-cols-3 gap-2 sticky top-0 left-0 w-full max-w-[640px] py-1 px-2 whitespace-nowrap",
    color: "bg-white",
  },
  first: "flex justify-start items-center text-left",
  second: "flex justify-center items-center text-center",
  third: "flex justify-end items-center text-right",
};

const Header = ({
  first = <></>,
  second = <></>,
  third = <></>,
  className,
}) => {
  return (
    <div
      className={`${styles.container.base} ${styles.container.color} ${className}`}
    >
      <div className={styles.first}>{renderElement(first)}</div>
      <div className={styles.second}>{renderElement(second)}</div>
      <div className={styles.third}>{renderElement(third)}</div>
    </div>
  );
};

Header.propTypes = {
  first: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  second: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  third: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
  className: PropTypes.string,
};

export default Header;
