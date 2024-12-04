import React from "react";
import Modal from "../common/Modal.jsx";
import PropTypes from "prop-types";
import IngredientSearch from "./IngredientSearch.jsx";
import { useState } from "react";
import Button from "../common/Button.jsx";
import IngredientItem from "../IngredientItem.jsx";
import Ingredient from "../../models/Ingredient.jsx";
import { createSavingTypeEnum } from "../../utils/createSavingTypeEnum.jsx";
const styles = {
  register: {
    container:
      "flex border leading-none p-2 mt-2 rounded-md bg-gray-100 h-full flex flex-col justify-between",
    button:
      "w-full bg-green-300 text-white rounded-md hover:bg-green-400 py-2 mt-4",
    buttonDisabled:
      "w-full bg-gray-300 text-white rounded-md hover:bg-gray-300 py-2 mt-4",
    noDataText: "text-gray-400 m-2 font-semibold",
  },
  modal: {
    selectedIngredientsList: {
      container:
        "flex p-2 mt-2 rounded-md bg-gray-100 h-full flex flex-col justify-between",
      noDataText: "text-gray-500",
    },
  },
};

const SelectedIngredientsList = ({ ingredients, setIngredients }) => {
  const selectedIngredients = ingredients.map((ingredient) => {
    return new Ingredient({
      ...ingredient,
      savingType: createSavingTypeEnum().defaultKey(),
    });
  });

  const handleSaveIngredient = (ingredient) => {
    setIngredients(
      ingredients.map((i) =>
        i.foodName === ingredient.foodName ? ingredient : i
      )
    );
  };

  const handleDeleteIngredient = (ingredient) => {
    setIngredients(ingredients.filter((i) => i.name !== ingredient.name));
  };

  return (
    <div className={styles.modal.selectedIngredientsList.container}>
      {selectedIngredients && selectedIngredients.length > 0 ? (
        selectedIngredients.map((ingredient, index) => (
          <div key={index}>
            <IngredientItem
              ingredient={ingredient}
              onSave={handleSaveIngredient}
              onDelete={handleDeleteIngredient}
            />
            <hr />
          </div>
        ))
      ) : (
        <p className={styles.modal.selectedIngredientsList.noDataText}>
          등록된 정보가 없습니다.
        </p>
      )}
    </div>
  );
};

const IngredientRegisterModal = ({
  children,
  onClose,
  onConfirm,
  className,
}) => {
  const [ingredients, setIngredients] = useState([]);

  const handleSelectIngredient = (items) => {
    setIngredients(items);
  };

  return (
    <Modal onClose={onClose} className={className}>
      <div>
        {/* 재료 검색 */}
        <IngredientSearch
          onConfirm={(items) => handleSelectIngredient(items)}
        />
        {/* 재료 등록 */}
        <div className={styles.register.container}>
          {/* selected Ingredient List */}
          {ingredients && ingredients.length > 0 ? (
            <SelectedIngredientsList
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          ) : (
            <p className={styles.register.noDataText}>
              등록된 정보가 없습니다.
            </p>
          )}
          <Button
            onClick={() => {
              onConfirm(ingredients);
            }}
            label="등록"
            disabled={ingredients.length === 0}
            className={
              ingredients.length === 0
                ? styles.register.buttonDisabled
                : styles.register.button
            }
          />
        </div>
      </div>
    </Modal>
  );
};

IngredientRegisterModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default IngredientRegisterModal;
