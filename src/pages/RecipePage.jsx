import React, { useEffect, useState } from "react";
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
const style = {
  page: "top-[100px] left-0 flex flex-col w-full h-content justify-start max-w-body",
  title: "text-md font-bold text-gray-500 leading-none mb-4",
  button:
    "text-sm font-bold text-gray-700 bg-white w-full py-2 hover:bg-gray-100 rounded-md",
  toggleButton: {
    button: "px-4 py-2 rounded-lg",
    normal: "bg-gray-300",
    orange: "bg-orange-500 text-white",
  },
};

const RecipePage = () => {
  const { tag, recipeId } = useParams();
  const { recipe, loading, loadRecipe, generateByAI, simplifyByAI } =
    useRecipe();
  const [isSelectAITypeOpen, setIsSelectAITypeOpen] = useState(false);
  const [isGenerateAddInfoOpen, setIsGenerateAddInfoOpen] = useState(false);
  const [isSimplifyAddInfoOpen, setIsSimplifyAddInfoOpen] = useState(false);
  const [isHealthyAddInfoOpen, setIsHealthyAddInfoOpen] = useState(false);
  const [dislikedIngredients, setDislikedIngredients] = useState([]);
  // const { }

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
    simplifyByAI: {
      name: "간편하게",
      next: () => {
        setIsSimplifyAddInfoOpen(true);
      },
    },
    healthyByAI: {
      name: "건강하게",
      next: () => {
        setIsHealthyAddInfoOpen(true);
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-white text-black">
        Loading...
      </div>
    ); // 로딩 중일 때 표시
  }

  if (!recipe && !loading) {
    return;
  }

  return (
    <div className={style.page}>
      <RecipeProfile image={recipe?.main_img || ""} />
      {/* <RecipeHeader recipeName={recipe.name} /> */}
      <RecipeDescription {...recipe} />
      <IngredientList ingredients={recipe.ingredients} className="mt-5" />
      <CookingStepList
        orders={recipe.cooking_order}
        images={recipe.cooking_img}
      />
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
            className={style.button}
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
        <div className="flex flex-wrap gap-2">
          {recipe.ingredients.map((ingredient) => (
            <ToggleButton
              key={ingredient.id}
              defaultToggle={true}
              onSetTrue={() => {
                setDislikedIngredients((prev) =>
                  prev.filter((i) => i !== ingredient)
                );
              }}
              onSetFalse={() => {
                setDislikedIngredients((prev) => [...prev, ingredient]);
              }}
              trueClassName={`${style.toggleButton.button} ${style.toggleButton.orange}`}
              falseClassName={`${style.toggleButton.button} ${style.toggleButton.normal}`}
            >
              {ingredient}
            </ToggleButton>
          ))}
          <button
            className={style.button}
            onClick={() => {
              generateByAI({
                recipeId: recipe.id,
                dislikedIngredients,
              });
            }}
          >
            변환 시작
          </button>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isSimplifyAddInfoOpen}
        onClose={() => {
          setIsSimplifyAddInfoOpen(false);
        }}
      >
        {/* 추가 정보 입력 컴포넌트 */}
      </BottomSheet>
      <BottomSheet
        isOpen={isHealthyAddInfoOpen}
        onClose={() => {
          setIsHealthyAddInfoOpen(false);
        }}
      >
        {/* 추가 정보 입력 컴포넌트 */}
      </BottomSheet>
    </div>
  );
};

export default RecipePage;
