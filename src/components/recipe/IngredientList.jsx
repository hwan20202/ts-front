import React from "react";
import PropTypes from "prop-types";
import Button from "../common/Button.jsx";

const style = {
  container: "flex flex-col bg-white p-6",
  title: "text-left text-xl font-bold text-black p-0 mb-4",
  ingredient: {
    container:
      "grid grid-cols-[1fr_1fr_auto] items-center text-md font-semibold text-gray-500 py-2 mb-2",
    name: "text-left font-semibold",
    quantity: "text-left",
    button:
      "flex justify-end text-sm text-white px-6 py-1 rounded-full bg-green-500 font-semibold",
  },
  divider: "border-t border-gray-200",
};

const IngredientItem = ({ name, quantity }) => {
  const purchase = () => {
    const url = import.meta.env.VITE_APP_COUPANG_URL;
    console.log(`purchase: ${name}`);
    window.open(`${url}${name}`, "_blank");
  };

  return (
    <div className={style.ingredient.container}>
      <span className={style.ingredient.name}>{name}</span>
      <span className={style.ingredient.quantity}>{quantity}</span>
      <span className={style.ingredient.button}>
        <button onClick={purchase}>구입</button>
      </span>
    </div>
  );
};

IngredientItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
};

const IngredientList = ({ ingredients, className }) => {
  const classList = `
    ${className}
    `;

  return (
    <div className={`${style.container} ${classList}`}>
      <h2 className={style.title}>요리 재료</h2>
      {ingredients &&
        ingredients.map((ingredient, index) => (
          <div key={index}>
            <IngredientItem
              name={ingredient.name}
              quantity={ingredient.quantity}
            />
            <hr className={style.divider} />
          </div>
        ))}
    </div>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default IngredientList;
