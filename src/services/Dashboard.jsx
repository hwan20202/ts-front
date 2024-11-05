import React, { useState, useEffect } from "react";
import Divider from "../components/Divider.jsx";
import { useDashboard } from "../context/DashboardProvider.jsx";
import IngredientRegisterModal from "../services/IngredientRegisterModal.jsx";
import PropTypes from "prop-types";
// FoodGroup 컴포넌트
const FoodGroup = ({ title, items }) => (
  <div className="bg-white rounded-lg shadow p-1 text-black mb-2">
    <h2 className="text-sm font-bold mb-1 border-b pb-1 text-left lg:text-xs">
      {title}
    </h2>
    <div className="space-y-1">
      {items &&
        items.map((item, index) => (
          //Todo: Food Component 추가
          <div key={index} className="p-1 bg-gray-50 rounded lg:text-xs">
            {item.name} - {item.expirationDate} - {item.storageMethod}
          </div>
        ))}
    </div>
  </div>
);

// Container 컴포넌트
const Container = ({ title, foodGroups }) => {
  // 그룹별로 식재료를 묶기
  const groupedItems = foodGroups.reduce((acc, item) => {
    const group = item.group;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-gray-100 rounded-lg shadow p-2">
      <h2 className="text-lg font-bold text-black p-1 lg:text-sm">{title}</h2>
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
      storageMethod: PropTypes.string.isRequired,
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
    <div className="container mx-auto p-2">
      {/* 대시보드 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-black">대시보드</h1>
        <div className="space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
            onClick={openModal}
          >
            식재료 등록
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg">
            버튼 2
          </button>
        </div>
      </div>

      {/* 큰 컨테이너 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
