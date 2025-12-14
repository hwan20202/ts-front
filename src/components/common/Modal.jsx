import React from "react";
import PropTypes from "prop-types";

const style = {
  container:
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",
  modal:
    "bg-white p-6 rounded-md shadow-lg max-w-xl w-full max-h-[80vh] overflow-y-auto",
  closeButton:
    "absolute top-5 right-2 z-50 bg-green-300 text-white w-8 h-8 leading-[0] rounded-full hover:bg-blue-600",
};

const Modal = ({ onClose, children }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <div onClick={closeModal} className={style.container}>
      <div onClick={(e) => e.stopPropagation()} className={style.modal}>
        <button onClick={closeModal} className={style.closeButton}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Modal;
