import { useEffect, useRef, useState } from "react";

const Scrollable = ({ children, className }) => {
  return <div className={`overflow-y-auto ${className}`}>{children}</div>;
};

export default Scrollable;
