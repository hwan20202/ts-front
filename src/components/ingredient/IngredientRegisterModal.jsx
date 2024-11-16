import React, { cloneElement } from "react";
import Modal from "../common/Modal.jsx";
import PropTypes from "prop-types";
import IngredientSearch from "./IngredientSearch.jsx";
import { useState } from "react";
import Button from "../common/Button.jsx";

const styles = {
  register: {
    container:
      "flex border p-4 mt-2 rounded-md bg-gray-100 h-full flex flex-col justify-between",
    button:
      "w-full bg-green-500 text-white rounded-md hover:bg-green-600 py-2 mt-4",
    noDataText: "text-gray-500",
  },
};

const IngredientRegisterModal = ({ children, onClose, className }) => {
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
                ? cloneElement(child, { ingredients })
                : child
            )
          ) : (
            <p className={styles.register.noDataText}>
              등록된 정보가 없습니다.
            </p>
          )}
          <Button
            onClick={() => {}}
            label="등록"
            className={styles.register.button}
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
