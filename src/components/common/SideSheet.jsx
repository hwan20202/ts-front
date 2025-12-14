import React, { useEffect } from "react";
import PropTypes from "prop-types";

const styles = {
  container:
    "fixed inset-y-0 z-50 right-0 bg-white shadow-lg transition-transform overflow-y-auto",
  open: "translate-x-0",
  closed: "translate-x-full",
  overlay: "fixed z-40 inset-0 bg-black bg-opacity-50",
  closeButton: "absolute top-2 left-2 text-gray-500 hover:text-gray-700 p-4",
};

const SideSheet = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <div
        className={`${styles.container} ${
          isOpen ? styles.open : styles.closed
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative px-4 py-12">
          <button onClick={onClose} className={styles.closeButton}>
            <i className="fa-solid fa-angles-right text-lg"></i>
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

SideSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default SideSheet;
