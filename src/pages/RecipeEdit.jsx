import { useState, useEffect } from "react";
import RecipeProfile from "../components/recipe/RecipeProfile";
import RecipeDescription from "../components/recipe/RecipeDescription";
import EditIngredientList from "../components/recipe/edit/EditIngredientList";
import EditCookingStepList from "../components/recipe/edit/EditCookingStepList";
import useRecipeEdit from "../hooks/useRecipeEdit";
import { useParams } from "react-router-dom";
import RecipeEditFooter from "../components/footer/RecipeEditFooter";
const style = {
  page: "flex flex-col w-full h-full justify-start",
};

const RecipeEdit = () => {
  const { recipeId } = useParams();
  const {
    recipe,
    loading,
    editIngredient,
    deleteIngredient,
    editCookingImg,
    editCookingOrder,
    editComplete,
  } = useRecipeEdit(recipeId);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  return (
    <div className={style.page}>
      <RecipeProfile image={recipe.mainImg} />
      <RecipeDescription {...recipe} />
      <EditIngredientList
        {...recipe}
        onChange={editIngredient}
        onDelete={deleteIngredient}
      />
      <EditCookingStepList
        {...recipe}
        editCookingOrder={editCookingOrder}
        editCookingImg={editCookingImg}
      />
      <RecipeEditFooter editComplete={editComplete} />
    </div>
  );
};

export default RecipeEdit;
