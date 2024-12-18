import { useState, useEffect } from "react";
import RecipeProfile from "../components/recipe/RecipeProfile";
import RecipeDescription from "../components/recipe/RecipeDescription";
import EditIngredientList from "../components/recipe/edit/EditIngredientList";
import EditCookingStepList from "../components/recipe/edit/EditCookingStepList";
import useRecipeEdit from "../hooks/useRecipeEdit";
import { useParams, useNavigate } from "react-router-dom";
import RecipeEditFooter from "../components/footer/RecipeEditFooter";
import { useRecipe } from "../context/RecipeProvider";
const style = {
  page: "flex flex-col w-full h-full justify-start",
};

const RecipeEdit = () => {
  const navigate = useNavigate();
  const { editRecipe, loading } = useRecipe();
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-white text-black">
        Loading...
      </div>
    );
  }
  const {
    recipe,
    loading: loadingEdit,
    editIngredient,
    deleteIngredient,
    editCookingImg,
    editCookingOrder,
    editComplete,
  } = useRecipeEdit(editRecipe);

  if (loadingEdit) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-white text-black">
        Loading...
      </div>
    );
  }
  if (!recipe) {
    return;
  }
  console.log(recipe);

  return (
    <div className={style.page}>
      <RecipeProfile image={recipe?.main_img || ""} />
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
