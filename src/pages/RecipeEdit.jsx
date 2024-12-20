import { useState, useEffect } from "react";
import RecipeProfile from "../components/recipe/RecipeProfile";
import RecipeDescription from "../components/recipe/RecipeDescription";
import EditIngredientList from "../components/recipe/edit/EditIngredientList";
import EditCookingStepList from "../components/recipe/edit/EditCookingStepList";
import useRecipeEdit from "../hooks/useRecipeEdit";
import { useParams, useNavigate } from "react-router-dom";
import RecipeEditFooter from "../components/footer/RecipeEditFooter";
import { useRecipe } from "../context/RecipeProvider";
import RecipeLoading from "./RecipeLoading";
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
    addIngredient,
    editCookingImg,
    editCookingOrder,
    addCookingOrder,
    editComplete,
  } = useRecipeEdit(editRecipe);

  if (loadingEdit) {
    return <RecipeLoading />;
  }
  if (!recipe) {
    return;
  }

  return (
    <div className={style.page}>
      <RecipeProfile image={recipe?.main_img || ""} />
      <RecipeDescription {...recipe} />
      <EditIngredientList
        {...recipe}
        onChange={editIngredient}
        onDelete={deleteIngredient}
        onAdd={addIngredient}
      />
      <EditCookingStepList
        {...recipe}
        editCookingOrder={editCookingOrder}
        editCookingImg={editCookingImg}
        addCookingOrder={addCookingOrder}
      />
      <RecipeEditFooter editComplete={editComplete} />
    </div>
  );
};

export default RecipeEdit;
