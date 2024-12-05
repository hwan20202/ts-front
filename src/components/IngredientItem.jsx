import React from "react";
import PropTypes from "prop-types";
import IngredientEditBox from "./IngredientEditBox";
import { useState, useEffect } from "react";
import Ingredient from "../models/Ingredient";

const styles = {
  ingredientItem: {
    container:
      "grid grid-cols-[1fr_2fr] items-center rounded-full my-1 cursor-pointer",
    text: "text-md font-semibold text-gray-400",
  },
};

const IngredientItem = ({ ingredient, onSave, onDelete }) => {
  const [savingType, setSavingType] = useState(ingredient.savingType);
  const [days, setDays] = useState(
    ingredient.getDaysUntilExpiration() !== 0
      ? ingredient.getDaysUntilExpiration()
      : 7
  );

  useEffect(() => {
    onSave(
      new Ingredient({
        ...ingredient,
        savingType,
        expirationDate: new Date(
          new Date().setDate(new Date().getDate() + parseInt(days))
        ),
      })
    );
  }, [savingType, days]);

  return (
    <div className={styles.ingredientItem.container}>
      <span className={styles.ingredientItem.text} onClick={onDelete}>
        {ingredient.foodName}
      </span>
      <IngredientEditBox
        defaultSavingType={savingType}
        defaultDays={days}
        setSavingType={setSavingType}
        setDays={setDays}
      />
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: PropTypes.shape({
    foodName: PropTypes.string.isRequired,
    savingType: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default IngredientItem;
