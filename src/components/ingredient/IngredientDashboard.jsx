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
    category: "flex flex-col text-black font-bold",
    savingType: "p-2 rounded-md",
    minSize: "min-h-[100px] min-w-[150px]",
  },
};

const DashboardIngredientView = ({ ingredient }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { deleteIngredient, updateIngredient } = useUserContext();

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex items-center shadow-sm rounded-md px-3 justify-center">
      <div
        className="flex text-xs text-gray-500 justify-center py-2 whitespace-nowrap"
        onClick={toggleEdit}
      >
        {ingredient.foodName}
        {isEdit && (
          <button onClick={() => deleteIngredient(ingredient)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

DashboardIngredientView.propTypes = {
  ingredient: PropTypes.shape({
    foodName: PropTypes.string.isRequired,
  }).isRequired,
};

const FoodTypeSection = ({ title, children }) => {
  return (
    <>
      <span className={styles.body.savingType}>{title}</span>
      {children}
    </>
  );
};

const SavingTypeContainer = ({ ingredients, isDroppable }) => {
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
      {Object.keys(dividedIngredients).map((foodType, index) => (
        <FoodTypeSection title={foodType} key={index}>
          {dividedIngredients[foodType].map((ingredient, i) =>
            isDroppable ? (
              <Draggable
                onDragStart={() => handleDragStart(ingredient)}
                onDragEnd={handleDragEnd}
                onTouchStart={() => handleTouchStart(ingredient)}
                key={i}
              >
                <DashboardIngredientView ingredient={ingredient} />
              </Draggable>
            ) : (
              <DashboardIngredientView ingredient={ingredient} key={i} />
            )
          )}
        </FoodTypeSection>
      ))}
    </div>
  );
};

const SavingTypeSection = ({ title, children }) => {
  return (
    <div className={styles.body.category}>
      <h2 className="text-black">{title}</h2>
      {children}
    </div>
  );
};

const IngredientDashboardContainer = ({ category }) => {
  const { ingredients } = useUserContext();
  const { updateIngredient } = useUserContext();
  const { data, overlay } = useDragAndDropContext();

  const handleDrop = (ref, savingType) => {
    if (data && data.ingredient) {
      updateIngredient({ ...data.ingredient, savingType });
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
    <div className="flex">
      {category.map(({ name, savingType, filter, isDroppable }, index) => (
        <SavingTypeSection title={name} key={index}>
          {isDroppable ? (
            <Droppable
              onDrop={(ref) => handleDrop(ref, savingType)}
              onDragOver={handleDragOver}
              onDragEnter={(ref) => handleDragEnter(ref, filter(ingredients))}
              onDragLeave={handleDragLeave}
              data={savingType}
            >
              <SavingTypeContainer
                ingredients={filter(ingredients)}
                isDroppable={true}
              />
            </Droppable>
          ) : (
            <SavingTypeContainer
              ingredients={filter(ingredients)}
              isDroppable={false}
            />
          )}
        </SavingTypeSection>
      ))}
    </div>
  );
};

const IngredientDashboardSection = ({ children }) => {
  return <div className={styles.body.container}>{children}</div>;
};

const IngredientDashboard = ({ ingredientsList }) => {
  const { categories } = useDashboard();
  return (
    <DragAndDropProvider>
      <IngredientDashboardSection ingredientsList={ingredientsList}>
        <IngredientDashboardContainer
          category={[
            { ...categories.EXPIRING_SOON, isDroppable: false },
            { ...categories.REFRIGERATED, isDroppable: true },
            { ...categories.FROZEN, isDroppable: true },
            { ...categories.ROOM_TEMPERATURE, isDroppable: true },
          ]}
        />
      </IngredientDashboardSection>
    </DragAndDropProvider>
  );
};

IngredientDashboard.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.instanceOf(Ingredient)),
};

export default IngredientDashboard;
