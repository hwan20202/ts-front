import React from "react";

const XScrollable = ({ children, onScrollEnd }) => {
  const handleScroll = () => {
    onScrollEnd();
  };

  return (
    <div
      className="overflow-x-scroll overflow-y-hidden scrollbar-hide"
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};

export default XScrollable;
