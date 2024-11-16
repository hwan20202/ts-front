import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserProvider.jsx";
import IngredientRegisterModal from "./IngredientRegisterModal.jsx";
import RadioOptions from "../common/RadioOptions.jsx";

const styles = {
  container: "container mx-auto p-2 bg-white",
  header: {
    container: "flex justify-between items-center my-4",
    title: "text-md font-bold text-black",
    button:
      "text-sm font-bold text-green-300 border border-green-300 px-3 py-1 rounded-md hover:bg-green-300 hover:text-white",
  },
  body: {
    foodGroup: {
      container: "grid items-center justify-center grid-cols-[1fr_5fr]",
      title: "text-sm text-gray-500 whitespace-nowrap",
    },
  },
  modal: {
    selectedIngredientsList: {
      container:
        "flex border p-4 mt-2 rounded-md bg-gray-100 h-full flex flex-col justify-between",
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
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* header */}
      <div className={styles.header.container}>
        <span className={styles.header.title}>싫어하는 재료</span>
        <button className={styles.header.button} onClick={openModal}>
          재료 등록
        </button>
      </div>

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

      {/* modal */}
      {isOpen && (
        <IngredientRegisterModal onClose={closeModal} className="z-50">
          <SelectedIngredientsList />
        </IngredientRegisterModal>
      )}
    </div>
  );
};

export default DislikedIngredientsView;
