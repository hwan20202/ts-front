import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Ingredient from "../../models/Ingredient";
import { useIngredient } from "../../hooks/useIngredient";
import { useUserContext } from "../../context/UserProvider";
import useDashboard from "../../hooks/useDashboard";
import Droppable from "../common/Droppable";
import Draggable from "../common/Draggable";
import {
  DragAndDropProvider,
  useDragAndDropContext,
} from "../../context/DragAndDropProvider";

const styles = {
  body: {
    container:
      "flex overflow-x-auto overflow-y-hidden scrollbar-hide py-2 gap-1",
    category: "flex w-full flex-col text-black font-bold border rounded-sm p-1",
    savingType: "",
    minSize: "min-h-[100px] min-w-[150px]",
  },
};

const Dday = ({ dday, className }) => {
  return <div className={className}>{dday > 0 ? `D-${dday}` : "만료"}</div>;
};

const DashboardIngredientView = ({ ingredient }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { deleteIngredient, updateIngredient } = useUserContext();

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex items-center rounded-md px-3 justify-center bg-white">
      <div
        className="flex w-full gap-2 text-xs text-gray-500 justify-between items-center py-2 whitespace-nowrap"
        onClick={toggleEdit}
      >
        <Dday
          dday={ingredient.getDaysUntilExpiration()}
          className="text-xs text-orange-500 flex-shrink-0 border-2 border-orange-400 rounded-full px-2"
        />
        {ingredient.food_name}
        <button onClick={() => deleteIngredient(ingredient)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

const ExpiringSoonIngredientView = ({ ingredient }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { deleteIngredient, updateIngredient } = useUserContext();

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex items-center rounded-md px-1 justify-center bg-white gap-2">
      <div
        className="flex w-full gap-2 text-xxs text-gray-500 justify-between items-center py-2 whitespace-nowrap"
        onClick={toggleEdit}
      >
        <Dday
          dday={ingredient.getDaysUntilExpiration()}
          className="text-xxs leading-none text-red-500 flex-shrink-0 border-2 border-red-400 rounded-full px-2"
        />
        {ingredient.food_name}
        <button onClick={() => deleteIngredient(ingredient)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

DashboardIngredientView.propTypes = {
  ingredient: PropTypes.shape({
    food_name: PropTypes.string.isRequired,
  }).isRequired,
};

const FoodTypeSection = ({ title, children }) => {
  return (
    <>
      <h2 className="text-xs text-right text-gray-500 font-semibold px-2 my-1">
        {title}
      </h2>
      {children}
    </>
  );
};

const FoodTypeContainer = ({ ingredients }) => {
  const { divideByFoodType } = useIngredient();
  const dividedIngredients = divideByFoodType(ingredients);
  const { proxySetData, proxySetDragOverTarget } = useDragAndDropContext();

  const handleDragStart = (ingredient) => {
    proxySetData({ ingredient });
  };

  const handleDragEnd = () => {
    proxySetData(null);
  };

  return (
    <div className={`${styles.body.savingType} ${styles.body.minSize}`}>
      {Object.keys(dividedIngredients).map((food_type, index) => (
        <FoodTypeSection title={food_type} key={index}>
          {dividedIngredients[food_type].map((ingredient, i) => (
            <Draggable
              onDragStart={() => handleDragStart(ingredient)}
              onDragEnd={handleDragEnd}
              onTouchStart={() => handleTouchStart(ingredient)}
              key={i}
              className="m-1"
            >
              <DashboardIngredientView ingredient={ingredient} />
            </Draggable>
          ))}
        </FoodTypeSection>
      ))}
    </div>
  );
};

const SavingTypeSection = ({ title, children }) => {
  return (
    <div className={styles.body.category}>
      <h2 className="text-black leading-none text-md font-bold mt-2 px-2">
        {title}
      </h2>
      {children}
    </div>
  );
};

const SavingTypeContainer = ({ category }) => {
  const { ingredients } = useUserContext();
  const { updateIngredient } = useUserContext();
  const { data, overlay } = useDragAndDropContext();

  const handleDrop = (ref, saving_type) => {
    if (data && data.ingredient) {
      updateIngredient({ ...data.ingredient, saving_type });
    }
    if (ref) {
      const over = ref.querySelector(".overlay");
      if (over) {
        ref.removeChild(over);
      }
    }
  };

  const handleDragOver = (ref) => {};

  const handleDragEnter = (ref, ingredients) => {
    if (
      ref &&
      !ingredients.some((ingredient) => ingredient.id === data.ingredient.id)
    ) {
      ref.appendChild(overlay.current);
    }
  };

  const handleDragLeave = (ref) => {
    if (ref) {
      const over = ref.querySelector(".overlay");
      if (over) {
        ref.removeChild(over);
      }
    }
  };

  return (
    <div className={styles.body.container}>
      {category.map(({ name, saving_type, filter }, index) => (
        <SavingTypeSection title={name} key={index}>
          <Droppable
            onDrop={(ref) => handleDrop(ref, saving_type)}
            onDragOver={handleDragOver}
            onDragEnter={(ref) => handleDragEnter(ref, filter(ingredients))}
            onDragLeave={handleDragLeave}
            data={saving_type}
            className="bg-gray-100 rounded-md h-full"
          >
            <FoodTypeContainer
              ingredients={filter(ingredients)}
              isDroppable={true}
            />
          </Droppable>
        </SavingTypeSection>
      ))}
    </div>
  );
};

const ExpiringSoonSection = ({ title, children }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-black text-base font-bold">{title}</h2>
      {children}
    </div>
  );
};

const ExpiringSoonContainer = ({ ingredients }) => {
  return (
    <ExpiringSoonSection title="유통기한 임박">
      <div className="flex flex-wrap text-black font-bold border border-red-300 p-2 rounded-sm gap-1">
        {ingredients.length === 0 ? (
          <div className="w-full text-xs text-center font-lighta text-gray-300">
            유통기한 임박한 재료가 없습니다.
          </div>
        ) : (
          ingredients.map((ingredient, index) => (
            <ExpiringSoonIngredientView ingredient={ingredient} key={index} />
          ))
        )}
      </div>
    </ExpiringSoonSection>
  );
};

const IngredientDashboardSection = ({ children }) => {
  return <div className="">{children}</div>;
};

const IngredientDashboard = ({ ingredientsList }) => {
  const { categories } = useDashboard();
  return (
    <DragAndDropProvider>
      <IngredientDashboardSection ingredientsList={ingredientsList}>
        <div className="flex flex-col gap-2">
          <ExpiringSoonContainer
            ingredients={[
              ...categories.EXPIRED.filter(ingredientsList),
              ...categories.EXPIRING_SOON.filter(ingredientsList),
            ]}
          />
          <SavingTypeContainer
            category={[
              categories.REFRIGERATED,
              categories.FROZEN,
              categories.ROOM_TEMPERATURE,
            ]}
          />
        </div>
      </IngredientDashboardSection>
    </DragAndDropProvider>
  );
};

IngredientDashboard.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)),
};

export default IngredientDashboard;
