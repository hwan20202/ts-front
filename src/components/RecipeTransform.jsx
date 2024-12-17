import { useState, useEffect } from "react";
import BottomSheet from "./common/BottomSheet";
import { useRecipe } from "../context/RecipeProvider";

const styles = {
  title: "text-md font-bold text-gray-500 leading-none mb-4",
  list: "flex flex-col w-full",
  button:
    "text-sm font-bold text-gray-700 bg-white w-full py-2 hover:bg-gray-100 rounded-md",
};

const Step = {
  FIRST: "AI 변환 유형 선택",
};

const RecipeTransform = ({ start, setStart, recipeId }) => {
  const [step, setStep] = useState(0);
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

  useEffect(() => {
    if (start) {
      setStep(Step.FIRST);
    }
  }, [start]);

  useEffect(() => {
    if (step === Step.FIRST) {
      setChildren(
        <div>
          <h6 className={styles.title}>AI로 변환하기</h6>
          <ul className={styles.list}>
            {Object.values(type).map(({ name, handleClick }, index) => (
              <li key={index}>
                <button
                  className={styles.button}
                  onClick={() => {
                    handleClick(recipeId);
                    navigate(`/recipe/${recipeId}/edit`);
                  }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }, [step]);

  return (
    <div>
      <BottomSheet isOpen={start} onClose={() => setStart(false)}>
        {children}
      </BottomSheet>
    </div>
  );
};

export default RecipeTransform;
