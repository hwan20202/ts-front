import React, { useState } from "react";
import IngredientItem from "../IngredientItem.jsx";
import PropTypes from "prop-types";
import Ingredient from "../../utils/Ingredient.jsx";
import { useUserContext } from "../../context/UserProvider.jsx";
import { createSavingTypeEnum } from "../../utils/createSavingTypeEnum.jsx";
import IngredientEditBox from "../IngredientEditBox.jsx";
const SavingTypeEnum = createSavingTypeEnum();

const styles = {
  body: {
    container:
      "flex overflow-x-auto overflow-y-hidden scrollbar-hide py-2 gap-1",
    savingTypeContainer: {
      container:
        "text-gray-500 font-bold shrink-0 min-w-[100px] rounded-md m-1 shadow-lg",
      containerTitle:
        "text-xs font-bold text-gray-800 lg:text-xs whitespace-nowrap p-2 pb-1",
      line: "mx-3 mb-2 border-gray-100",
    },
    groupContainer: {
      container: "m-3 font-bold",
      containerTitle:
        "p-0 text-xs font-bold text-gray-600 lg:text-xs bg-orange-100 rounded-sm px-2",
    },
  },
  modal: {
    selectedIngredientsList: {
      container:
        "flex p-2 mt-2 rounded-md bg-gray-100 h-full flex flex-col justify-between",
      noDataText: "text-gray-500",
    },
  },
};

const divideIngredientsBySavingTypeAndFoodType = (ingredients) => {
  const dividedIngredients = {
    EXPIRING_SOON: [],
    ROOM_TEMPERATURE: [],
    REFRIGERATED: [],
    FROZEN: [],
  };
  ingredients.forEach((ingredient) => {
    const { savingType } = ingredient;

    if (Ingredient.isExpiringSoon(ingredient)) {
      dividedIngredients["EXPIRING_SOON"].push(ingredient);
    } else {
      dividedIngredients[savingType].push(ingredient);
    }
  });
  Object.keys(dividedIngredients).forEach((savingType) => {
    dividedIngredients[savingType] = Ingredient.getIngredientsByFoodType(
      dividedIngredients[savingType]
    );
  });

  return dividedIngredients;
};

const SelectedIngredientsList = ({ ingredients, setIngredients }) => {
  const selectedIngredients = ingredients.map((ingredient) => {
    return new Ingredient({
      ...ingredient,
      savingType: SavingTypeEnum.defaultKey(),
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

const DashboardIngredientView = ({ ingredient }) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      {isEdit ? (
        <>
          <DashboardIngredientEditBox
            ingredient={ingredient}
            toggleEdit={toggleEdit}
          />
        </>
      ) : (
        <div
          onClick={toggleEdit}
          className="grid grid-cols-[1fr_2fr] gap-2 items-center text-xs font-bold leading-4 py-2 px-3 border-gray-200 shadow-sm rounded-lg my-2 hover:bg-gray-100 cursor-pointer"
        >
          <div className="flex text-orange-400 text-xs justify-center border-2 border-orange-300 rounded-full px-1">
            {`D-${ingredient.getDaysUntilExpiration()}`}
          </div>
          <div className="flex text-gray-500 justify-center">
            {ingredient.foodName}
          </div>
        </div>
      )}
    </>
  );
};

const DashboardIngredientEditBox = ({ ingredient, toggleEdit }) => {
  const { updateIngredient, deleteIngredient } = useUserContext();
  const [selectedDays, setSelectedDays] = useState(
    ingredient.getDaysUntilExpiration()
  );
  const [savingType, setSavingType] = useState(ingredient.savingType);

  const handleSave = (ingredient) => {
    updateIngredient({
      ...ingredient,
      expirationDate: new Date(
        new Date().setDate(new Date().getDate() + parseInt(selectedDays))
      ).toISOString(),
      savingType,
    });
  };

  const handleDelete = () => {
    deleteIngredient(ingredient);
  };

  return (
    <div
      onClick={toggleEdit}
      className="flex gap-4 items-center text-xs font-bold leading-4 py-2 px-3 border-gray-200 shadow-sm rounded-lg my-2 hover:bg-gray-100 cursor-pointer"
    >
      <IngredientEditBox
        defaultSavingType={savingType}
        defaultDays={selectedDays}
        setSavingType={setSavingType}
        setDays={setSelectedDays}
      />
      <div className="flex w-full text-gray-500 justify-center">
        {ingredient.foodName}
      </div>
      <button onClick={() => handleSave(ingredient)}>
        <i className="fa-solid fa-check"></i>
      </button>
      <button onClick={handleDelete}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

DashboardIngredientView.propTypes = {
  ingredient: PropTypes.shape({
    foodName: PropTypes.string.isRequired,
  }).isRequired,
};

const IngredientDashboard = ({ ingredientsList }) => {
  if (!ingredientsList) return null;

  const DashboardCategoryEnum = {
    EXPIRING_SOON: "유통기한 임박",
    ...SavingTypeEnum.keys().reduce((acc, key) => {
      acc[key] = SavingTypeEnum.getValue(key);
      return acc;
    }, {}),
  };

  const ingredients = divideIngredientsBySavingTypeAndFoodType(ingredientsList);

  return (
    <div className={styles.body.container}>
      {/* 대시보드 바디 컨테이너*/}
      {Object.keys(ingredients).map((savingType, index) => (
        <div key={index} className={styles.body.savingTypeContainer.container}>
          {/* 대시보드 저장방법별 컨테이너*/}
          <h2 className={styles.body.savingTypeContainer.containerTitle}>
            {DashboardCategoryEnum[savingType]}
          </h2>
          <hr className={styles.body.savingTypeContainer.line} />
          {Object.keys(ingredients[savingType]).map((group, index) => (
            <div key={index} className={styles.body.groupContainer.container}>
              <span className={styles.body.groupContainer.containerTitle}>
                {group}
              </span>
              {ingredients[savingType][group].map((ingredient, index) => (
                <DashboardIngredientView key={index} ingredient={ingredient} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

IngredientDashboard.propTypes = {
  ingredientsList: PropTypes.array,
};

export default IngredientDashboard;
export { SelectedIngredientsList };
