import React from "react";
import PropTypes from "prop-types";
import Button from "../common/Button.jsx";

const style = {
  container: "flex flex-col bg-white p-6",
  title: "text-left text-xl font-bold text-black p-0 mb-4",
  ingredient: {
    container:
      "grid grid-cols-[2fr_3fr_1fr] items-center text-gray-500 py-2 mb-1 mx-4",
    name: "text-left text-xs font-bold",
    quantity: "text-left text-xs text-gray-400 font-semibold",
    button:
      "flex justify-end text-xs whitespace-nowrap text-white px-4 leading-none py-0.5 rounded-full bg-green-500 font-semibold",
  },
  divider: "border-t border-1 border-gray-100 mx-2",
};

const IngredientItem = ({ name, amount }) => {
  const purchase = () => {
    const url = import.meta.env.VITE_APP_COUPANG_URL;
    console.log(`purchase: ${name}`);
    window.open(`${url}${name}`, "_blank");
  };

  return (
    <div className={style.ingredient.container}>
      <span className={style.ingredient.name}>{name}</span>
      <span className={style.ingredient.quantity}>{amount}</span>
      <span className={style.ingredient.button}>
        <button onClick={purchase}>구입</button>
      </span>
    </div>
  );
};

IngredientItem.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
};

const IngredientList = ({ ingredients }) => {
  // console.log(ingredients);
  const parsedIngredients = ingredients.map((ingredient) =>
    JSON.parse(ingredient)
  );
  return (
    <div className={style.container}>
      <h2 className={style.title}>요리 재료</h2>
      {parsedIngredients &&
        parsedIngredients.map((ingredient, index) => (
          <div key={index}>
            <IngredientItem {...ingredient} />
            <hr className={style.divider} />
          </div>
        ))}
    </div>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default IngredientList;
