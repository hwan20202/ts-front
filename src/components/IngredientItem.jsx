import React from "react";
import PropTypes from "prop-types";
import IngredientEditBox from "./IngredientEditBox";

const styles = {
  ingredientItem: {
    container:
      "flex justify-between items-center px-5 py-1 border-4 border-white rounded-full my-1 cursor-pointer",
    text: "text-sm text-gray-500",
  },
};

const IngredientItem = ({ ingredient, onClick, onSave }) => {
  return (
    <div className={styles.ingredientItem.container}>
      <span className={styles.ingredientItem.text} onClick={onClick}>
        {ingredient.name}
      </span>
      <IngredientEditBox ingredient={ingredient} onSave={onSave} />
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default IngredientItem;
