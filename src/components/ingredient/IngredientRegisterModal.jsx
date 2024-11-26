import React, { cloneElement } from "react";
import Modal from "../common/Modal.jsx";
import PropTypes from "prop-types";
import IngredientSearch from "./IngredientSearch.jsx";
import { useState } from "react";
import Button from "../common/Button.jsx";

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
            React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? cloneElement(child, { ingredients, setIngredients })
                : child
            )
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
