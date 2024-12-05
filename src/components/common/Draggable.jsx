import PropTypes from "prop-types";
import { useRef, useState } from "react";
import createElementCopy from "../../utils/createElementCopy";

const Draggable = ({ children, onDragStart, onDragEnd }) => {
  const origin = useRef(null);
  const copy = useRef(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [dragOverTarget, setDragOverTarget] = useState(null);

  const handleDragStart = (e) => {
    // e.preventDefault();
    onDragStart();
  };

  const handleDragEnd = (e) => {
    // e.preventDefault();
    onDragEnd();
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const draggable = elements.find((el) => el.draggable);
    draggable.style.opacity = "0.5";
    origin.current = draggable;
    const rect = draggable.getBoundingClientRect();
    setOffsetX(touch.clientX - rect.left);
    setOffsetY(touch.clientY - rect.top);
    copy.current = createElementCopy(draggable);
    handleDragStart(e);
  };

  const handleTouchMove = (e) => {
    const touch = e.changedTouches[0];
    const droppable = document
      .elementsFromPoint(touch.clientX, touch.clientY)
      .find((el) => el.classList.contains("droppable"));
    if (copy.current) {
      const x = touch.clientX - offsetX;
      const y = touch.clientY - offsetY;
      // 요소의 위치 업데이트
      copy.current.style.left = `${x}px`;
      copy.current.style.top = `${y}px`;
    }
    if (droppable) {
      if (!dragOverTarget) {
        droppable.dispatchEvent(
          new Event("dragenter", { bubbles: true, cancelable: true })
        );
        setDragOverTarget(droppable);
      }
      droppable.dispatchEvent(
        new Event("dragover", { bubbles: true, cancelable: true })
      );
    }
    if (!droppable) {
      if (dragOverTarget) {
        dragOverTarget.dispatchEvent(
          new Event("dragleave", { bubbles: true, cancelable: true })
        );
        setDragOverTarget(null);
      }
    }
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const dropTargets = document.elementsFromPoint(
      touch.clientX,
      touch.clientY
    );
    const dropTarget = dropTargets.find((target) =>
      target.classList.contains("droppable")
    );
    if (dropTarget) {
      dropTarget.dispatchEvent(
        new Event("drop", { bubbles: true, cancelable: true })
      );
    }
    if (origin.current) {
      origin.current.style.opacity = "1";
      origin.current.style.transform = "none";
      setOffsetX(0);
      setOffsetY(0);
      document.body.removeChild(copy.current);
      copy.current = null;
      origin.current = null;
      setDragOverTarget(null);
    }
    handleDragEnd(e);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="touch-none rounded-md hover:cursor-grabbing hover:scale-105 hover:shadow-md transition-all duration-200"
    >
      {children}
    </div>
  );
};

Draggable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Draggable;
