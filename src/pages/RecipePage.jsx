import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IngredientList from "../components/recipe/IngredientList.jsx";
import RecipeProfile from "../components/recipe/RecipeProfile.jsx";
import RecipeDescription from "../components/recipe/RecipeDescription.jsx";
import CookingStepList from "../components/recipe/CookingStepList.jsx";
import RecipeFooter from "../components/footer/RecipeFooter.jsx";
import { useRecipe } from "../context/RecipeProvider.jsx";
import { useNavigate } from "react-router-dom";
const style = {
  page: "top-[100px] left-0 flex flex-col w-full h-content justify-start max-w-body",
};

const RecipePage = () => {
  const { tag, recipeId } = useParams();
  const { recipe, loading, loadRecipe } = useRecipe();

  useEffect(() => {
    loadRecipe(tag, recipeId);
  }, []);

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

  console.log(recipe);

  return (
    <div className={style.page}>
      <RecipeProfile image={recipe?.main_img || ""} />
      {/* <RecipeHeader recipeName={recipe.name} /> */}
      <RecipeDescription {...recipe} />
      {/* Section 1 */}
      <IngredientList ingredients={recipe.ingredients} className="mt-5" />
      {/* Section 2 */}
      <CookingStepList
        orders={recipe.cooking_order}
        images={recipe.cooking_img}
      />
      <RecipeFooter aiTransform={() => {}} eatComplete={() => {}} />
    </div>
  );
};

export default RecipePage;
