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
    category:
      "flex w-full flex-col text-black font-bold border-2 border-gray-400 rounded-lg",
    savingType: "p-2 rounded-md",
    minSize: "min-h-[100px] min-w-[150px]",
  },
};

const Dday = ({ dday }) => {
  return (
    <div className="text-xs text-orange-500 flex-shrink-0 border-2 border-orange-400 rounded-full px-2">
      {dday > 0 ? `D-${dday}` : "만료"}
    </div>
  );
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
        <Dday dday={ingredient.getDaysUntilExpiration()} />
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
      <span className={styles.body.savingType}>{title}</span>
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
      <h2 className="text-black">{title}</h2>
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
    <div className="flex flex-col text-black font-bold">
      <h2 className="text-black">{title}</h2>
      {children}
    </div>
  );
};

const ExpiringSoonContainer = ({ ingredients }) => {
  return (
    <ExpiringSoonSection title="유통기한 임박">
      <div className="flex text-black font-bold bg-red-200 p-2 rounded-lg border-2 border-red-400">
        {ingredients.map((ingredient, index) => (
          <DashboardIngredientView ingredient={ingredient} key={index} />
        ))}
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
