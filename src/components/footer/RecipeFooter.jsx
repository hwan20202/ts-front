import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { putEatenRecipe } from "../../services/fetchUserRecipe";
import { useRecipe } from "../../context/RecipeProvider";
import BottomSheet from "../common/BottomSheet";
import ToggleButton from "../common/ToggleButton";
import Popover from "../common/Popover";
import Scrollable from "../common/Scrollable";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const styles = {
  container:
    "sticky bottom-0 left-0 flex justify-center p-2 w-full max-w-body h-12 bg-white gap-2 border-t border-gray-100",
  textContainer: "flex justify-center items-center p-1 mx-4",
  text: " text-sm text-gray-500 whitespace-nowrap font-sans",
  button:
    "text-sm font-bold w-full py-1 rounded-md text-white hover:bg-green-400 hover:text-white",
  buttonColorGreen: "bg-green-300 text-white hover:bg-green-400",
  buttonColorOrange: "bg-orange-300 text-white hover:bg-orange-400",

  page: "top-0 left-0 flex flex-col w-full h-content justify-start max-w-body",
  title: "text-md font-bold text-gray-500 leading-none mb-4",
  button: "text-sm font-bold text-gray-700 w-full py-2 rounded-md",
  buttonHover: {
    normal: "hover:bg-gray-100",
    orange: "hover:bg-orange-500",
  },
  toggleButton: {
    button: "px-4 py-2 rounded-lg",
    normal: "bg-gray-300",
    red: "bg-red-400 text-white",
    orange: "bg-orange-400 text-white",
    green: "bg-green-400 text-white",
  },
};

const SelectMealCount = ({ children, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mealCount, setMealCount] = useState(1);

  useEffect(() => {
    onSelect(mealCount);
  }, [mealCount]);

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(!isVisible);
        }}
      >
        {children}
        <Popover isVisible={isVisible} offset={30} className="w-full h-full">
          <Scrollable visibleCount={3} className="h-36 w-36 border-2">
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <div
                key={index}
                className="leading-none p-2 text-center text-gray-800 bg-white"
                onClick={() => {
                  setMealCount(item);
                  setIsVisible(false);
                }}
              >
                {item} 끼
              </div>
            ))}
          </Scrollable>
        </Popover>
      </div>
    </>
  );
};

const RecipeFooter = () => {
  const { tag } = useParams();
  const { recipe } = useRecipe();
  const [isSelectAITypeOpen, setIsSelectAITypeOpen] = useState(false);
  const [isGenerateAddInfoOpen, setIsGenerateAddInfoOpen] = useState(false);
  const [isHealthyAddInfoOpen, setIsHealthyAddInfoOpen] = useState(false);
  const [mealCount, setMealCount] = useState(1);
  const { generateByAI, simplifyByAI, healthyByAI } = useRecipe();
  const [dislikedIngredients, setDislikedIngredients] = useState([]);
  const navigate = useNavigate();

  if (!recipe) {
    return;
  }

  const handleEatComplete = () => {
    alert("조리 완료");
    putEatenRecipe({ ...recipe });
  };

  const handleEdit = () => {
    navigate(`/recipe/ai/${recipe.id}/edit`);
  };

  const transformType = {
    generateByAI: {
      name: "냉장고 파먹기",
      next: () => {
        setIsGenerateAddInfoOpen(true);
      },
    },
    healthyByAI: {
      name: "영양 맞춤",
      next: () => {
        setIsHealthyAddInfoOpen(true);
      },
    },
    simplifyByAI: {
      name: "쉽게 만들기",
      next: async () => {
        setIsSelectAITypeOpen(false);
        const newRecipe = await simplifyByAI({
          recipeId: recipe.id,
        });

        if (newRecipe) {
          navigate(`/recipe/ai/${newRecipe.getRecipeId()}/edit`);
        }
      },
    },
  };

  return (
    <>
      <div className={styles.container}>
        {tag === "original" ? (
          <button
            className={`${styles.button} ${styles.buttonColorOrange}`}
            onClick={() => setIsSelectAITypeOpen(true)}
          >
            AI 변환
          </button>
        ) : (
          <button
            className={`${styles.button} ${styles.buttonColorOrange}`}
            onClick={handleEdit}
          >
            수정 하기
          </button>
        )}

        <button
          className={`${styles.button} ${styles.buttonColorGreen}`}
          onClick={handleEatComplete}
        >
          조리 완료
        </button>
      </div>
      <BottomSheet
        isOpen={isSelectAITypeOpen}
        onClose={() => {
          setIsSelectAITypeOpen(false);
        }}
      >
        {/* AI 변환 컴포넌트 */}
        <h2 className={styles.title}>AI 변환 유형</h2>
        {Object.values(transformType).map((type) => (
          <button
            key={type.name}
            className={`${styles.button} ${styles.buttonHover.normal}`}
            onClick={() => {
              setIsSelectAITypeOpen(false);
              type.next();
            }}
          >
            {type.name}
          </button>
        ))}
      </BottomSheet>
      <BottomSheet
        isOpen={isGenerateAddInfoOpen}
        onClose={() => {
          setIsGenerateAddInfoOpen(false);
        }}
      >
        {/* 추가 정보 입력 컴포넌트 */}
        <h2 className={styles.title}>싫어하는 재료</h2>
        <h6 className="text-sm text-gray-500 mb-3">
          싫어하는 재료를 선택하면 변환된 레시피에서 제외됩니다.
        </h6>
        <div className="flex flex-wrap gap-2">
          {recipe.ingredients.map((ingredient, index) => (
            <ToggleButton
              key={index}
              defaultToggle={false}
              onSetTrue={() => {
                setDislikedIngredients((prev) => [...prev, ingredient]);
              }}
              onSetFalse={() => {
                setDislikedIngredients((prev) =>
                  prev.filter((i) => i !== ingredient)
                );
              }}
              trueClassName={`${styles.toggleButton.button} ${styles.toggleButton.red}`}
              falseClassName={`${styles.toggleButton.button} ${styles.toggleButton.green}`}
            >
              {ingredient}
            </ToggleButton>
          ))}
          <button
            className={`${styles.button} ${styles.toggleButton.orange} ${styles.buttonHover.orange}`}
            onClick={async () => {
              setIsGenerateAddInfoOpen(false);
              const newRecipe = await generateByAI({
                recipeId: recipe.id,
                dislikedIngredients,
              });
              if (newRecipe) {
                navigate(`/recipe/ai/${newRecipe.getRecipeId()}/edit`);
              }
            }}
          >
            변환 시작
          </button>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isHealthyAddInfoOpen}
        onClose={() => {
          setIsHealthyAddInfoOpen(false);
        }}
      >
        <h2 className={styles.title}>추가 정보 입력</h2>
        <h4 className="text-sm text-gray-500">
          오늘 하루 남은 식사 횟수를 선택해주세요
        </h4>
        <div className="flex justify-center my-4">
          <SelectMealCount onSelect={setMealCount}>
            <div className="text-base font-bold leading-none text-gray-500 bg-gray-100 rounded-lg px-6 py-2">
              {mealCount} 끼
            </div>
          </SelectMealCount>
        </div>
        <button
          className={`${styles.button} ${styles.buttonHover.orange} ${styles.buttonColorOrange}`}
          onClick={async () => {
            setIsHealthyAddInfoOpen(false);
            const newRecipe = await healthyByAI({
              recipeId: recipe.id,
              mealCount,
            });
            if (newRecipe) {
              navigate(`/recipe/ai/${newRecipe.getRecipeId()}/edit`);
            } else {
              console.log("healthyByAI failed");
              alert("변환에 실패했습니다. 다시 시도해주세요.");
            }
          }}
        >
          변환 시작
        </button>
      </BottomSheet>
    </>
  );
};

RecipeFooter.propTypes = {
  aiTransform: PropTypes.func,
  eatComplete: PropTypes.func,
};

export default RecipeFooter;
