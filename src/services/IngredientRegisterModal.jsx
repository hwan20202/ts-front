import Modal from "../components/Modal.jsx";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Button from "../components/Button.jsx";
import IngredientSearch from "./IngredientSearch.jsx";
import IngredientItem from "../components/IngredientItem.jsx";
import { fetchIngredientRegister } from "../utils/fetchIngredient.jsx";
import Ingredient from "../utils/Ingredient.jsx";
import { useDashboard } from "../context/DashboardProvider.jsx";

// 스타일 변수 정의
const styles = {
  container:
    "flex border p-4 mt-2 rounded-md bg-gray-100 h-full flex flex-col justify-between",
  button:
    "w-full bg-green-500 text-white rounded-md hover:bg-green-600 py-2 mt-4",
  noDataText: "text-gray-500",
};

const IngredientRegisterModal = ({ onClose }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { addIngredient } = useDashboard();

  useEffect(() => {
    console.log(selectedIngredients);
  }, [selectedIngredients]);

  const handleSelectIngredient = (items) => {
    setSelectedIngredients((prev) => {
      const newIngredients = items.map((item) => {
        return new Ingredient({ name: item.name });
      });
      return [...prev, ...newIngredients];
    });
  };

  const handleRemoveIngredient = (index) => {
    setSelectedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRegisterToDashboard = async (list) => {
    list.map(async (ingredient) => {
      addIngredient(ingredient);
    });
  };

  const handleSave = (updatedIngredient) => {
    setSelectedIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
      )
    );
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <IngredientSearch
          onConfirm={(items) => handleSelectIngredient(items)}
        />

        {/* 추가 정보 */}
        <div className={styles.container}>
          <div>
            {selectedIngredients.length > 0 ? (
              selectedIngredients.map((data, index) => (
                <IngredientItem
                  key={index}
                  ingredient={data}
                  onClick={() => handleRemoveIngredient(index)}
                  onSave={(ingredient) => handleSave(ingredient)}
                />
              ))
            ) : (
              <p className={styles.noDataText}>등록된 정보가 없습니다.</p>
            )}
          </div>
          <Button
            onClick={() => {
              handleRegisterToDashboard(selectedIngredients);
            }}
            label="대시보드에 등록"
            className={styles.button}
          />
        </div>
      </div>
    </Modal>
  );
};

IngredientRegisterModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default IngredientRegisterModal;
