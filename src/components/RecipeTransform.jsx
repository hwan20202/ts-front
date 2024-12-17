import { useState, useEffect } from "react";
import BottomSheet from "./common/BottomSheet";
import { useRecipe } from "../context/RecipeProvider";

const styles = {
  title: "text-md font-bold text-gray-500 leading-none mb-4",
  list: "flex flex-col w-full",
  button:
    "text-sm font-bold text-gray-700 bg-white w-full py-2 hover:bg-gray-100 rounded-md",
};

const RecipeTransform = ({ start, setStart, recipeId }) => {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [children, setChildren] = useState(null);
  const { generateByAI, simplifyByAI } = useRecipe();

  const type = {
    generateByAI: {
      name: "알잘딱깔센",
      handleClick: generateByAI,
    },
    simplifyByAI: {
      name: "간편하게",
      handleClick: simplifyByAI,
    },
    healthyByAI: {
      name: "건강하게",
      handleClick: () => console.log("건강하게 clickedclicked"),
    },
  };

  return (
    <div>
      <BottomSheet isOpen={start} onClose={() => setStart(false)}>
        <div>
          <h6 className={styles.title}>AI로 변환하기</h6>
          <button className={styles.button} onClick={() => {}}></button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default RecipeTransform;
