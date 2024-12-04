import React from "react";
import PropTypes from "prop-types";

const styles = {
  container: "transition-all duration-300 ease-in-out overflow-hidden",
  open: "w-full",
  closed: "w-0",
};

const Wing = ({ isOpen, children }) => {
  return (
    <div
      className={`${styles.container} ${isOpen ? styles.open : styles.closed}`}
    >
      {children}
    </div>
  );
};

Wing.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export { Wing };
