import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import IngredientList from "../components/recipe/IngredientList.jsx";
import RecipeProfile from "../components/recipe/RecipeProfile.jsx";
import RecipeDescription from "../components/recipe/RecipeDescription.jsx";
import CookingStepList from "../components/recipe/CookingStepList.jsx";
import RecipeFooter from "../components/footer/RecipeFooter.jsx";
import { useRecipe } from "../context/RecipeProvider.jsx";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../components/common/BottomSheet.jsx";
import ToggleButton from "../components/common/ToggleButton.jsx";
import Dropdown from "../components/common/Dropdown.jsx";
import RecipeLoading from "./RecipeLoading.jsx";
import WheelSelector from "../components/common/WheelSelector.jsx";
import MenuSelect from "../components/common/MenuSelect.jsx";
import Slider from "../components/common/Slider.jsx";
import Popover from "../components/common/Popover.jsx";
import Scrollable from "../components/common/Scrollable.jsx";
const style = {
  page: "top-[100px] left-0 flex flex-col w-full h-content justify-start max-w-body",
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

const RecipePage = () => {
  const { tag, recipeId } = useParams();
  const {
    recipe,
    loading,
    loadRecipe,
    generateByAI,
    simplifyByAI,
    healthyByAI,
  } = useRecipe();
  const [isSelectAITypeOpen, setIsSelectAITypeOpen] = useState(false);
  const [isGenerateAddInfoOpen, setIsGenerateAddInfoOpen] = useState(false);
  const [isHealthyAddInfoOpen, setIsHealthyAddInfoOpen] = useState(false);
  const [dislikedIngredients, setDislikedIngredients] = useState([]);
  const [mealCount, setMealCount] = useState(1);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    loadRecipe(tag, recipeId);
  }, []);

  const transformType = {
    generateByAI: {
      name: "알잘딱깔센",
      next: () => {
        setIsGenerateAddInfoOpen(true);
      },
    },
    healthyByAI: {
      name: "건강하게",
      next: () => {
        setIsHealthyAddInfoOpen(true);
      },
    },
    simplifyByAI: {
      name: "간편하게",
      next: async () => {
        const newRecipe = await simplifyByAI({
          recipeId: recipe.id,
        });
        if (newRecipe) {
          navigate(`/recipe/${newRecipe.id}/edit`);
        }
      },
    },
  };

  const ingredientRef = useRef(null);
  const cookingStepRef = useRef(null);

  useEffect(() => {}, [ingredientRef, cookingStepRef]);

  if (loading) {
    return <RecipeLoading />; // 로딩 중일 때 표시
  }

  if (!recipe && !loading) {
    return;
  }

  return (
    <div className={style.page}>
      <RecipeProfile image={recipe?.main_img || ""} />
      <RecipeDescription {...recipe} />
      <MenuSelect
        options={["재료 보기", "조리 순서 보기"]}
        onChange={(index) => {
          setCurrentSlide(index);
        }}
      />
      <Slider
        position={currentSlide}
        height={
          currentSlide === 0
            ? `${ingredientRef?.current?.offsetHeight}px`
            : "100%"
        }
      >
        <div className="w-full flex flex-col bg-white px-6 shrink-0">
          <div ref={ingredientRef}>
            <IngredientList ingredients={recipe.ingredients} />
          </div>
        </div>
        <div className="w-full flex flex-col bg-white px-6 gap-4 shrink-0">
          <CookingStepList
            orders={recipe.cooking_order}
            images={recipe.cooking_img}
          />
        </div>
      </Slider>
      <RecipeFooter
        aiTransform={() => {
          setIsSelectAITypeOpen(true);
        }}
        eatComplete={() => {}}
      />
      <BottomSheet
        isOpen={isSelectAITypeOpen}
        onClose={() => {
          setIsSelectAITypeOpen(false);
        }}
      >
        {/* AI 변환 컴포넌트 */}
        <h2 className={style.title}>AI 변환 유형</h2>
        {Object.values(transformType).map((type) => (
          <button
            key={type.name}
            className={`${style.button} ${style.buttonHover.normal}`}
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
        <h2 className={style.title}>싫어하는 재료</h2>
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
              trueClassName={`${style.toggleButton.button} ${style.toggleButton.red}`}
              falseClassName={`${style.toggleButton.button} ${style.toggleButton.green}`}
            >
              {ingredient}
            </ToggleButton>
          ))}
          <button
            className={`${style.button} ${style.toggleButton.orange} ${style.buttonHover.orange}`}
            onClick={async () => {
              const newRecipe = await generateByAI({
                recipeId: recipe.id,
                dislikedIngredients,
              });
              if (newRecipe) {
                navigate(`/recipe/${newRecipe.id}/edit`);
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
        <h2 className={style.title}>추가 정보 입력</h2>
        <div className="flex justify-center">
          <SelectMealCount onSelect={setMealCount}>
            <div className="text-base font-bold leading-none text-gray-500 bg-gray-100 rounded-lg px-6 py-2">
              {mealCount} 끼
            </div>
          </SelectMealCount>
        </div>
        <button
          className={style.button}
          onClick={async () => {
            const newRecipe = await healthyByAI({
              recipeId: recipe.id,
              mealCount,
            });
            if (newRecipe) {
              navigate(`/recipe/${newRecipe.id}/edit`);
            } else {
              console.log("healthyByAI failed");
              alert("변환에 실패했습니다. 다시 시도해주세요.");
            }
          }}
        >
          변환 시작
        </button>
      </BottomSheet>
    </div>
  );
};

export default RecipePage;
