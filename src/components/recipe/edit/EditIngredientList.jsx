import PropTypes from "prop-types";
import { useState, useEffect } from "react";
const style = {
  container: "flex flex-col bg-white p-6",
  title: "text-left text-xl font-bold text-black p-0 mb-4",
  ingredient: {
    container:
      "grid grid-cols-[3fr_3fr_2fr] items-center text-md font-semibold text-gray-500 py-1box-border",
    first: "flex justify-start font-semibold",
    second: "flex justify-center",
    third: "flex justify-end",
    button:
      "text-sm font-bold w-full py-1 rounded-md text-white hover:bg-green-400 hover:text-white",
    buttonColorGreen: "bg-green-300 text-white hover:bg-green-400",
    deleteIcon: "text-red-300 hover:text-red-500",
    input:
      "w-full bg-gray-300 text-sm rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-green-500 shadow-md",
  },
  divider: "border-t border-gray-200 my-2",
};

const EditIngredientItem = ({
  id,
  name,
  quantity,
  onDelete = () => {},
  onUpdate = () => {},
}) => {
  const deleteIngredient = (id) => {
    onDelete(id);
  };

  const updateIngredient = ({ id, quantity }) => {
    onUpdate({ id, quantity });
  };

  return (
    <div className={style.ingredient.container}>
      <div className={style.ingredient.first}>{name}</div>
      <div className={style.ingredient.second}>
        <input
          type="text"
          defaultValue={quantity}
          onChange={(e) => updateIngredient({ id, quantity: e.target.value })}
          className={style.ingredient.input}
        />
      </div>
      <div className={style.ingredient.third}>
        {/* 삭제 버튼 */}
        <i
          className={`fa-solid fa-circle-xmark ${style.ingredient.deleteIcon}`}
          onClick={deleteIngredient}
        ></i>
      </div>
    </div>
  );
};

EditIngredientItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

const EditIngredientList = ({ ingredients }) => {
  const [ingredientList, setIngredientList] = useState(ingredients);

  useEffect(() => {}, [ingredients]);

  // add ingredient

  // delete ingredient

  // update quantity

  return (
    <div className={style.container}>
      <h2 className={style.title}>요리 재료</h2>
      {ingredients &&
        ingredients.map((ingredient, index) => (
          <div key={index}>
            <EditIngredientItem
              id={ingredient.id}
              name={ingredient.name}
              quantity={ingredient.quantity}
            />
            <hr className={style.divider} />
          </div>
        ))}
      <button
        className={`${style.ingredient.button} ${style.ingredient.buttonColorGreen}`}
      >
        재료 추가
      </button>
    </div>
  );
};

EditIngredientList.propTypes = {
  ingredients: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default EditIngredientList;
