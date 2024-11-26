import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserProvider.jsx";
import IngredientRegisterModal from "./IngredientRegisterModal.jsx";
import RadioOptions from "../common/RadioOptions.jsx";

const styles = {
  container: "container mx-auto px-2 py-4 bg-white mb-4",
  body: {
    foodGroup: {
      container: "grid items-center justify-center grid-cols-[1fr_5fr]",
      title: "text-sm text-gray-500 whitespace-nowrap",
    },
  },
  modal: {
    selectedIngredientsList: {
      container: "flex border p-4 mt-2 rounded-md bg-gray-100 h-full",
      noDataText: "text-gray-500",
    },
  },
};

const SelectedIngredientsList = ({ ingredients }) => {
  return (
    <div className={styles.modal.selectedIngredientsList.container}>
      <RadioOptions
        onChange={(value) => {
          console.log(value);
        }}
        options={ingredients.map((ingredient) => ingredient.name)}
      />
    </div>
  );
};

const DislikedIngredientsView = () => {
  const { dislikedIngredientsByGroup } = useUserContext();

  return (
    <div className={styles.container}>
      {/* body */}
      {Object.keys(dislikedIngredientsByGroup).map((foodGroup, index) => (
        <div
          key={index}
          className={`${styles.body.foodGroup.container} ${styles.body.foodGroup.gridTemplate}`}
        >
          <div className={styles.body.foodGroup.titleContainer}>
            <span className={styles.body.foodGroup.title}>{foodGroup}</span>
          </div>
          <div className={styles.body.foodGroup.optionsContainer}>
            <RadioOptions
              options={dislikedIngredientsByGroup[foodGroup].map(
                (ingredient) => ingredient.name
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DislikedIngredientsView;
export { SelectedIngredientsList };
