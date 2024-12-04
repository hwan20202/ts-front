import React from "react";
import PropTypes from "prop-types";
import renderElement from "../../utils/renderElement.jsx";

const styles = {
  header: "flex w-full justify-center items-center bg-white",
};

const Header = ({ children }) => {
  return <div className={styles.header}>{children}</div>;
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
