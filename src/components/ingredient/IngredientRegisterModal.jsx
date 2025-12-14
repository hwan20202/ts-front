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
      "flex leading-none mt-5 rounded-sm  h-full flex flex-col justify-between",
    button:
      "w-full bg-green-300 text-white text-sm font-semibold rounded-sm hover:bg-green-400 py-0.5 mt-2",
    buttonDisabled: "hover:bg-gray-300",
    noDataText:
      "w-full py-5 my-2 rounded-sm bg-gray-100 text-sm text-center text-gray-400 font-semibold",
  },
  modal: {
    selectedIngredientsList: {
      container:
        "flex mt-2 border-t rounded-sm h-full flex flex-col justify-between",
      noDataText: "text-gray-500",
    },
  },
};

const SelectedIngredientsList = ({ ingredients, setIngredients }) => {
  const selectedIngredients = ingredients.map((ingredient) => {
    return new Ingredient({
      ...ingredient,
      saving_type: createSavingTypeEnum().defaultKey(),
    });
  });

  const handleSaveIngredient = (ingredient) => {
    setIngredients((prev) =>
      prev.map((i) => (i.food_name === ingredient.food_name ? ingredient : i))
    );
  };

  const handleDeleteIngredient = (ingredient) => {
    setIngredients((prev) =>
      prev.filter((i) => i.food_name !== ingredient.food_name)
    );
  };

  return (
    <div className={styles.modal.selectedIngredientsList.container}>
      {selectedIngredients && selectedIngredients.length > 0 ? (
        selectedIngredients.map((ingredient, index) => (
          <div key={index}>
            <IngredientItem
              ingredient={ingredient}
              onSave={handleSaveIngredient}
              onDelete={() => handleDeleteIngredient(ingredient)}
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
              styles.register.button +
              (ingredients.length === 0 ? styles.register.buttonDisabled : "")
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
