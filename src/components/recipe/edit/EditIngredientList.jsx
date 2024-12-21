import PropTypes from "prop-types";
import { useState, useEffect } from "react";
const style = {
  textColor: {
    white: "text-white",
    gray: "text-gray-500",
    black: "text-gray-800",
    green: "text-green-500",
  },
  container: "w-full flex flex-col bg-white p-6",
  title: "text-left text-xl font-bold text-black p-0 mb-4",
  ingredient: {
    container: "flex items-center text-md font-semibold box-border",
    name: "w-full flex justify-start font-semibold text-base",
    button:
      "text-sm font-bold w-full py-1 rounded-md hover:bg-green-400 hover:text-white",
    buttonColorGreen: "bg-green-300  hover:bg-green-400",
    deleteIcon: "text-red-300 hover:text-red-500",
    input:
      "w-full bg-gray-300 text-sm rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-green-500 shadow-md",
  },
  divider: "border-t border-gray-200 my-1",
};

const EditIngredientItem = ({
  index,
  name,
  // amount,
  onChange = () => {},
  onDelete = () => {},
}) => {
  return (
    <div className={style.ingredient.container} key={index}>
      <div className={style.ingredient.name + " " + style.textColor.black}>
        {name}
      </div>
      <div className={style.ingredient.deleteIcon}>
        {/* 삭제 버튼 */}
        <i
          className={`fa-solid fa-circle-xmark ${style.ingredient.deleteIcon}`}
          onClick={() => onDelete({ index })}
        ></i>
      </div>
    </div>
  );
};

EditIngredientItem.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

const EditIngredientList = ({
  ingredients,
  onChange = () => {},
  onDelete = () => {},
  onAdd = () => {},
}) => {
  // add ingredient
  const handleAddIngredient = (newIngredients) => {
    onAdd(newIngredients);
  };

  // delete ingredient

  return (
    <div className={style.container}>
      <h2 className={style.title}>요리 재료</h2>
      {ingredients &&
        ingredients.map((ingredient, index) => (
          <div key={index}>
            <EditIngredientItem
              index={index}
              name={ingredient}
              onChange={onChange}
              onDelete={onDelete}
            />
            <hr className={style.divider} />
          </div>
        ))}
      <form
        className="flex items-center gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          const newIngredients = e.target.ingredient.value
            .split(" ")
            .map((i) => i.trim())
            .filter((i) => i !== "");
          handleAddIngredient(newIngredients);
          e.target.ingredient.value = "";
        }}
      >
        <input
          type="text"
          name="ingredient"
          className={`${style.ingredient.input} ${style.textColor.black}`}
          placeholder="추가할 재료를 띄어쓰기로 구분해주세요"
        />
        <button
          className="text-sm text-white font-bold whitespace-nowrap px-4 py-1 rounded-md bg-green-300 hover:bg-green-400"
          type="submit"
        >
          추가
        </button>
      </form>
    </div>
  );
};

EditIngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default EditIngredientList;
