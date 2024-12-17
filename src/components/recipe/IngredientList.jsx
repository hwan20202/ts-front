import React from "react";
import PropTypes from "prop-types";
import Button from "../common/Button.jsx";
import { Link } from "react-router-dom";

const style = {
  container: "flex flex-col bg-white p-6",
  title: "text-left text-xl font-bold text-black p-0 mb-4",
  ingredient: {
    container:
      "flex items-center justify-between text-gray-500 p-2 border border-gray-200 rounded-sm mb-1",
    containerHover: "hover:bg-gray-200",
    name: "text-left text-xs font-bold",
  },
};

const IngredientItem = ({ name }) => {
  // const purchase = () => {
  //   const url = import.meta.env.VITE_APP_COUPANG_URL;
  //   console.log(`purchase: ${name}`);
  //   window.open(`${url}${name}`, "_blank");
  // };
  const url = import.meta.env.VITE_APP_COUPANG_URL;

  return (
    <div
      className={`${style.ingredient.container} ${style.ingredient.containerHover}`}
    >
      <Link
        title={`쿠팡에서 ${name} 검색`}
        to={`${url}${name}`}
        target="_blank"
        className={style.ingredient.name}
      >
        {name}
      </Link>
    </div>
  );
};

IngredientItem.propTypes = {
  name: PropTypes.string.isRequired,
};

const IngredientList = ({ ingredients }) => {
  const parsedIngredients = ingredients;
  return (
    <div className={style.container}>
      <h2 className={style.title}>요리 재료</h2>
      {parsedIngredients &&
        parsedIngredients.map((ingredient, index) => (
          <IngredientItem key={index} name={ingredient} />
        ))}
    </div>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default IngredientList;
