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
        const url = import.meta.env.VITE_APP_COUPANG_URL;
        console.log(`purchase: ${name}`);
        window.open(`${url}${name}`, '_blank');
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



const IngredientList = (
    {
        data,
        className,
    }) => {

    const classList = `
    ${className}
    `;

    const ingredients = data.map((ingredient, index) => (
        <IngredientItem
            key={index}
            name={ingredient.name}
            quantity={ingredient.quantity}
        />
    ));

    return (
        <TitleWithItems title='요리 재료' items={ingredients} className={classList}/>
    );
};

IngredientList.propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
}

export default IngredientList;