import React from 'react';
import PropTypes from 'prop-types';

// 기본 버튼 컴포넌트
// variant = 'primary',  // 색상 선택을 위한 prop
const Button = (
    {
        label,
            type = 'button',
            onClick,
            disabled = false,
            size = 'md',           // 크기 선택을 위한 prop
            className = '',       // 추가적으로 외부에서 클래스 제공 가능
    }
) => {

    // 크기별 Tailwind 스타일
    const sizeStyles = {
        sm: 'text-sm py-1 px-2 w-24', // sm:w-32
        md: 'text-sm py-1 px-4 w-36', //sm:w-32
        lg: 'text-lg py-1 px-6 w-52', //md:w-48
        xl: 'text-lg py-1 px-8 w-72', //lg:w-56
    };

    // 결합된 클래스들
    const buttonClass = `
    /* 크기 */
    ${sizeStyles[size]}         
    
    /* 색상 */
    bg-button-primary
    hover:bg-button-primary-hover
    
    /* 공통 스타일 */
    flex items-center justify-center
    font-semibold rounded-lg shadow-md    
    transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75
    disabled:bg-gray-400 disabled:cursor-not-allowed
    
    /* 외부에서 전달된 클래스 */
    ${className}                          
  `;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn ${buttonClass}`}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

export default Button;