import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import IngredientList from "../components/recipe/IngredientList.jsx";
import RecipeProfile from "../components/recipe/RecipeProfile.jsx";
import RecipeDescription from "../components/recipe/RecipeDescription.jsx";
import CookingStepList from "../components/recipe/CookingStepList.jsx";
import { useRecipe } from "../context/RecipeProvider.jsx";
import RecipeLoading from "./RecipeLoading.jsx";
import MenuSelect from "../components/common/MenuSelect.jsx";
import Slider from "../components/common/Slider.jsx";
const style = {
  page: "top-0 left-0 bg-white flex flex-col w-full h-content justify-start max-w-body pb-10",
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

const RecipePage = () => {
  const { tag, recipeId } = useParams();
  const { recipe, loading, loadRecipe } = useRecipe();

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    loadRecipe(tag, recipeId);
  }, []);

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
      {/* <RecipeFooter /> */}
    </div>
  );
};

export default RecipePage;
