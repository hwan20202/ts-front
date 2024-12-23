import React from "react";
import PropTypes from "prop-types";
import renderElement from "../../utils/renderElement.jsx";

const styles = {
  header: "fixed top-0 flex w-full justify-center items-center p-2 max-w-body",
};

const Header = ({ children, className }) => {
  return <div className={`${styles.header} ${className}`}>{children}</div>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
