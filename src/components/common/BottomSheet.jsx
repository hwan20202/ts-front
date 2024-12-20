import React, { useEffect } from "react";
import PropTypes from "prop-types";

const styles = {
  container: "fixed inset-x-0 bottom-0 bg-white shadow-lg transition-transform",
  open: "translate-y-0",
  closed: "translate-y-full",
  overlay: "fixed inset-0 bg-black bg-opacity-50",
  closeButton:
    "absolute top-2 right-2 text-gray-500 bg-gray-200  p-1 rounded-md hover:text-gray-700",
};

const BottomSheet = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <div
        className={`${styles.container} ${
          isOpen ? styles.open : styles.closed
        }`}
      >
        <div className="relative p-4">
          <button onClick={onClose} className={styles.closeButton}>
            <i className={`fa-solid fa-xmark leading-none`}></i>
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

BottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default BottomSheet;
