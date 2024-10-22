import React from "react";
import PropTypes from "prop-types";
import renderElement from "../utils/renderElement.jsx";

const IconButton = (
    {
        icon,
        label,
        onClick = () => {},
        id,
        disabled = false,
        className = ''
    }) => {
    return (
        <button
            className={`flex items-center justify-center p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
            onClick={onClick}
            aria-label={label}
            disabled={disabled}
            id={id}
        >
            {renderElement(icon)}
        </button>
    );
}

IconButton.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]).isRequired, // 아이콘은 필수 요소
    label: PropTypes.string.isRequired, // 접근성을 위한 라벨 (시각적 텍스트는 아니지만 필수)
    onClick: PropTypes.func, // 버튼 클릭 시 호출될 함수
    disabled: PropTypes.bool,
    className: PropTypes.string, // 추가적인 Tailwind 클래스
    id: PropTypes.string,
};


export default IconButton;