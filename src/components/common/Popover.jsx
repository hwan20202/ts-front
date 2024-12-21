import React, { useEffect, useRef } from "react";

const Popover = ({ isVisible, children, offset = 10 }) => {
  const popoverRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isVisible && popoverRef.current && contentRef.current) {
      const { bottom, left, width } =
        popoverRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const contentHeight = contentRef.current.getBoundingClientRect().height;
      const contentWidth = contentRef.current.getBoundingClientRect().width;

      popoverRef.current.style.left = `${
        left + width / 2 - contentWidth / 2
      }px`; // x축 중앙 정렬

      if (bottom + contentHeight > windowHeight) {
        popoverRef.current.style.transform = `translateY(-${
          contentHeight + offset
        }px)`;
      } else {
        popoverRef.current.style.transform = "translateY(0)";
      }
    }
  }, [isVisible, offset]);
  if (!isVisible) return null;
  return (
    <div ref={popoverRef} className={`absolute`}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default Popover;
