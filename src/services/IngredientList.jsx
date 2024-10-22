import React from "react";
import PropTypes from "prop-types";
import TitleWithItems from "../components/TitleWithItems.jsx";
import Button from "../components/Button.jsx";

const IngredientItem = (
    {
        name,
        quantity
    }) => {

    const purchase = () => {
        console.log(`purchase: ${name}`);
    }

    return (
        <ul className='grid grid-cols-3 gap-2 px-2 text-lg font-semibold font-sans'>
            <li className='text-left'>{name}</li>
            <li className='text-right'>{quantity}</li>
            <li className='flex justify-end'><Button label='구입' onClick={purchase}/></li>
        </ul>
    );
};

IngredientItem.propTypes = {
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
}

const info = [
    {
        name: '양파',
        quantity: '1/2개',
    },
    {
        name: '마늘',
        quantity: '3쪽',
    },
    {
        name: '당근',
        quantity: '1개',
    }
];

const IngredientList = (
    {
        className,
    }) => {

    const combinedClass = `
    ${className}
    `;

    const ingredients = info.map((ingredient, index) => (
        <IngredientItem
            key={index}
            name={ingredient.name}
            quantity={ingredient.quantity}
        />
    ));

    return (
        <TitleWithItems title='요리 재료' items={ingredients} className={combinedClass}/>
    );
};

IngredientList.propTypes = {
    className: PropTypes.string,
}

export default IngredientList;