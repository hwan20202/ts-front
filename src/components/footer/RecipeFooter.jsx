import PropTypes from "prop-types";
import { useState } from "react";
import { putEatenRecipe } from "../../services/fetchUserRecipe";
import { useRecipe } from "../../context/RecipeProvider";

const styles = {
  container:
    "sticky bottom-0 left-0 flex justify-center p-2 w-full max-w-body h-12 bg-white gap-2 border-t border-gray-100",
  textContainer: "flex justify-center items-center p-1 mx-4",
  text: " text-sm text-gray-500 whitespace-nowrap font-sans",
  button:
    "text-sm font-bold w-full py-1 rounded-md text-white hover:bg-green-400 hover:text-white",
  buttonColorGreen: "bg-green-300 text-white hover:bg-green-400",
  buttonColorOrange: "bg-orange-300 text-white hover:bg-orange-400",
};

const RecipeFooter = ({ aiTransform, eatComplete }) => {
  const { recipe } = useRecipe();

  const handleEatComplete = () => {
    alert("조리 완료");
    putEatenRecipe({ ...recipe });
  };

  return (
    <>
      <div className={styles.container}>
        <button
          className={`${styles.button} ${styles.buttonColorOrange}`}
          onClick={aiTransform}
        >
          AI 변환
        </button>
        <button
          className={`${styles.button} ${styles.buttonColorGreen}`}
          onClick={handleEatComplete}
        >
          조리 완료
        </button>
      </div>
    </>
  );
};

RecipeFooter.propTypes = {
  aiTransform: PropTypes.func,
  eatComplete: PropTypes.func,
};

export default RecipeFooter;
