import React from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
const Droppable = ({
  onDragOver,
  onDrop,
  children,
  onDragEnter,
  onDragLeave,
  className,
}) => {
  const ref = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (ref.current) {
      onDrop(ref.current);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (ref.current) {
      onDragOver(ref.current);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (ref.current) {
      onDragEnter(ref.current);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (ref.current) {
      onDragLeave(ref.current);
    }
  };

  return (
    <div
      ref={ref}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`droppable touch-none relative ${className}`}
    >
      {children}
    </div>
  );
};

Droppable.propTypes = {
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Droppable;
