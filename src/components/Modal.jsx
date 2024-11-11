import React, { useState } from "react";
import PropTypes from "prop-types";

const Modal = ({ onClose, children }) => {

    const closeModal = () => {
        onClose();
    };

    // if (!isOpen) return null; // 모달이 닫혔을 때 렌더링되지 않음

    return (
        <div
            onClick={closeModal}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full"
            >
                {children}
                <button
                    onClick={closeModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    닫기
                </button>
            </div>
        </div>
    );
};
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default Modal;