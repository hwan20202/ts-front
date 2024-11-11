import React from "react";
import PropTypes from "prop-types";

const Divider = ({ className }) => {
  const classList = `border-t border-gray-300 ${className}`;
  return <hr className={classList} />;
};

Divider.propTypes = {
  className: PropTypes.string,
};

export default Divider;
