import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import RecipeTransform from "../RecipeTransform";
import { putEatenRecipe } from "../../services/fetchUserRecipe";
const styles = {
  container:
    "fixed bottom-0 left-0 flex justify-center p-2 w-full max-w-body h-12 bg-white gap-2 border-t border-gray-100",
  textContainer: "flex justify-center items-center p-1 mx-4",
  text: " text-sm text-gray-500 whitespace-nowrap font-sans",
  button:
    "text-sm font-bold w-full py-1 rounded-md text-white hover:bg-green-400 hover:text-white",
  buttonColorGreen: "bg-green-300 text-white hover:bg-green-400",
  buttonColorOrange: "bg-orange-300 text-white hover:bg-orange-400",
};

const RecipeFooter = () => {
  const { recipeId } = useParams();
  const [isAITransformModalOpen, setIsAITransformModalOpen] = useState(false);

  const handleEatComplete = () => {
    alert("조리 완료");
    putEatenRecipe(recipeId, "original");
  };

  return (
    <>
      <div className={styles.container}>
        <button
          className={`${styles.button} ${styles.buttonColorOrange}`}
          onClick={() => setIsAITransformModalOpen(true)}
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
      <RecipeTransform
        start={isAITransformModalOpen}
        setStart={setIsAITransformModalOpen}
        recipeId={recipeId}
      />
    </>
  );
};

RecipeFooter.propTypes = {
  aiTransform: PropTypes.func,
  eatComplete: PropTypes.func,
};

export default RecipeFooter;

{
  /*
  <div
            className="flex flex-col w-full bg-black p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h6 className="text-white text-2xl font-bold">AI로 변환하기</h6>
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  className="text-white text-sm font-bold"
                  onClick={() => console.log("알잘딱깔센 clicked")}
                >
                  <span>알잘딱깔센</span>
                </button>
              </li>
              <li>
                <button
                  className="text-white text-sm font-bold"
                  onClick={() => console.log("건강하게 clicked")}
                >
                  <span>건강하게</span>
                </button>
              </li>
              <li>
                <button
                  className="text-white text-sm font-bold"
                  onClick={() => console.log("간편하게 clicked")}
                >
                  <span>간편하게</span>
                </button>
              </li>
            </ul>
          </div>
  */
}
