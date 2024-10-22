import React from "react";
import PropTypes from "prop-types";

const TitleWithItems = (
    {
        title,
        items,
        className,
    }) => {

    const combinedClass = `
    ${className}
    w-full bg-gray-800 rounded-lg
    `;

    return (
        <div className={combinedClass}>
            <h2 className='text-left bg-gray-900 rounded-t-lg'>{title}</h2>
            <ul className='rounded-b-lg py-2'>
            {items.map((ItemComponent, index) => (
                <li key={index} className='p-1 md:p-2'>
                    {/* 하위 컴포넌트를 렌더링 */}
                    {React.isValidElement(ItemComponent) ? ItemComponent : <ItemComponent />}
                </li>
            ))}
            </ul>
        </div>
    )
}

TitleWithItems.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.element).isRequired,
    className: PropTypes.string,
}

export default TitleWithItems;