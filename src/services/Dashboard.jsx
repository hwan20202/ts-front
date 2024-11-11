import React, { useState } from "react";
import { useDashboard } from "../context/DashboardProvider.jsx";
import IngredientRegisterModal from "../services/IngredientRegisterModal.jsx";
import PropTypes from "prop-types";
import IngredientEditBox from "../components/IngredientEditBox.jsx";
import IconButton from "../components/IconButton.jsx";

const styles = {
  container: "container mx-auto p-2",
  header: "flex justify-between items-center mb-4",
  title: "text-xl font-bold text-black",
  button: "bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg",
  button2: "bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
  foodItem:
    "flex justify-between items-center px-3 py-2 bg-white border-b border-gray-200 lg:text-sm lg:py-1 hover:bg-gray-100",
  foodGroup: "bg-white rounded-lg shadow p-1 text-black mb-2",
  foodGroupTitle: "text-sm font-bold mb-2 border-b pb-1 text-left lg:text-xs",
  foodGroupItems: "space-y-1",
  containerGroup: "bg-gray-100 rounded-lg shadow p-2",
  containerTitle: "text-lg font-bold text-black p-1 lg:text-sm",
};

const getDday = (expirationDate) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  const diffTime = expiration.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const FoodItem = ({ ingredient }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [_ingredient, setIngredient] = useState(ingredient);
  const { updateIngredient, deleteIngredient } = useDashboard();

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
    updateIngredient(_ingredient.id, _ingredient);
  };

  const onSave = (updatedIngredient) => {
    setIngredient(updatedIngredient);
  };

  return (
    <div className={styles.foodItem} onClick={toggleEditMode}>
      <span className="text-md">{ingredient.name}</span>
      {isEditing ? (
        <>
          <IngredientEditBox ingredient={ingredient} onSave={onSave} />
          <IconButton
            label="삭제"
            icon={<i className="fa-solid fa-trash text-red-500 text-sm"></i>}
            onClick={() => deleteIngredient(ingredient.id)}
          />
        </>
      ) : (
        <>
          <span className="text-sm">{`D-${getDday(
            ingredient.expirationDate
          )}`}</span>
        </>
      )}
    </div>
  );
};

// FoodGroup 컴포넌트
const FoodGroup = ({ title, items }) => (
  <div className={styles.foodGroup}>
    <h2 className={styles.foodGroupTitle}>{title}</h2>
    <div className={styles.foodGroupItems}>
      {items &&
        items.map((item, index) => (
          <FoodItem
            key={index}
            ingredient={item} // ingredient 객체를 직접 전달
          />
        ))}
    </div>
  </div>
);

// Container 컴포넌트
const Container = ({ title, foodGroups }) => {
  const groupedItems = foodGroups.reduce((acc, item) => {
    const group = item.group;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {});

  return (
    <div className={styles.containerGroup}>
      <h2 className={styles.containerTitle}>{title}</h2>
      {Object.entries(groupedItems).map(([groupTitle, items], index) => (
        <FoodGroup key={index} title={groupTitle} items={items} />
      ))}
    </div>
  );
};

Container.propTypes = {
  title: PropTypes.string.isRequired,
  foodGroups: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      expirationDate: PropTypes.string.isRequired,
      savingType: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Dashboard = () => {
  const { dashboardInfo } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* 대시보드 헤더 */}
      <div className={styles.header}>
        <h1 className={styles.title}>대시보드</h1>
        <div className="space-x-2">
          <button className={styles.button} onClick={openModal}>
            식재료 등록
          </button>
          <button className={styles.button2}>버튼 2</button>
        </div>
      </div>

      {/* 큰 컨테이너 그리드 */}
      <div className={styles.grid}>
        {Object.values(dashboardInfo.containers).map((container, index) => (
          <Container
            key={index}
            title={container.title}
            foodGroups={container.foodGroups}
          />
        ))}
      </div>

      {/* 모달 */}
      {isOpen && <IngredientRegisterModal onClose={closeModal} />}
    </div>
  );
};

export default Dashboard;
