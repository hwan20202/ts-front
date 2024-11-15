import React, { useState } from "react";
import IngredientRegisterModal from "./IngredientRegisterModal.jsx";
import Ingredient from "../../utils/Ingredient.jsx";
import IngredientItem from "../IngredientItem.jsx";
import PropTypes from "prop-types";
import { SavingTypeEnum } from "../../utils/savingType.jsx";

const styles = {
  container: "container mx-auto p-2 bg-white",
  header: {
    container: "flex justify-between items-center my-4",
    title: "text-md font-bold text-black",
    button:
      "text-sm font-bold text-green-300 border border-green-300 px-3 py-1 rounded-md hover:bg-green-300 hover:text-white",
  },
  body: {
    container: "grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-1 pb-10",
    savingTypeContainer: {
      container: "text-gray-500 font-bold",
      containerTitle:
        "text-lg font-bold text-black p-1 lg:text-xs whitespace-nowrap",
    },
    groupContainer: {
      container: "text-gray-500 font-bold",
      containerTitle: "text-lg font-bold text-black p-1 lg:text-xs",
    },
  },
  modal: {
    selectedIngredientsList: {
      container:
        "flex border p-4 mt-2 rounded-md bg-gray-100 h-full flex flex-col justify-between",
      noDataText: "text-gray-500",
    },
  },
};

const divideIngredientsBySavingTypeAndGroup = (ingredients) => {
  const dividedIngredients = {
    "유통기한 임박": [],
    실온: [],
    냉장: [],
    냉동: [],
  };

  ingredients.forEach((ingredient) => {
    const { savingType } = ingredient;

    if (Ingredient.isExpiringSoon(ingredient)) {
      dividedIngredients["유통기한 임박"].push(ingredient);
    } else {
      dividedIngredients[SavingTypeEnum[savingType]].push(ingredient);
    }
  });

  Object.keys(dividedIngredients).forEach((savingType) => {
    dividedIngredients[savingType] = Ingredient.getIngredientsByGroups(
      dividedIngredients[savingType]
    );
  });

  return dividedIngredients;
};

const SelectedIngredientsList = ({ ingredients }) => {
  return (
    <div className={styles.modal.selectedIngredientsList.container}>
      {ingredients && ingredients.length > 0 ? (
        ingredients.map((data, index) => (
          <IngredientItem
            key={index}
            ingredient={data}
            onClick={() => {}}
            onSave={(ingredient) => {}}
          />
        ))
      ) : (
        <p className={styles.modal.selectedIngredientsList.noDataText}>
          등록된 정보가 없습니다.
        </p>
      )}
    </div>
  );
};

const IngredientDashboard = ({ ingredientsList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ingredients = divideIngredientsBySavingTypeAndGroup(ingredientsList);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* 대시보드 헤더 */}
      <div className={styles.header.container}>
        <h1 className={styles.header.title}>대시보드</h1>
        <div className="space-x-2">
          <button className={styles.header.button} onClick={openModal}>
            재료 등록
          </button>
          {/* <button className={styles.button2}>버튼 2</button> */}
        </div>
      </div>

      <div className={styles.body.container}>
        {/* 대시보드 바디 컨테이너*/}
        {ingredientsList.length > 0 &&
          Object.keys(ingredients).map((savingType, index) => (
            <div key={index} className={styles.body.savingTypeContainer}>
              {/* 대시보드 저장방법별 컨테이너*/}
              <h2 className={styles.body.savingTypeContainer.containerTitle}>
                {savingType}
              </h2>
              {Object.keys(ingredients[savingType]).map((group, index) => (
                <div
                  key={index}
                  className={styles.body.groupContainer.container}
                >
                  {/* 대시보드 식품군별 컨테이너*/}
                  <h2 className={styles.body.groupContainer.containerTitle}>
                    {group}
                  </h2>
                  {ingredients[savingType][group].map((ingredient, index) => (
                    <div key={index} className="text-sm leading-4">
                      {ingredient.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
      </div>
      {/* 모달 */}
      {isOpen && (
        <IngredientRegisterModal onClose={closeModal}>
          {/* <DashboardRegisterContainer ingredients={ingredients} /> */}
          <SelectedIngredientsList />
        </IngredientRegisterModal>
      )}
    </div>
  );
};

IngredientDashboard.propTypes = {
  ingredientsList: PropTypes.array,
};

export default IngredientDashboard;
