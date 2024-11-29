import { useState, useEffect } from "react";
import { getRecipe } from "../services/fetchRecipe";
import { postEditedRecipe } from "../services/fetchUserRecipe";
import Recipe from "../models/Recipe";
import { useNavigate } from "react-router-dom";

const useRecipeEdit = (initialRecipe) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialRecipe) return;
    const newIngredients = initialRecipe.ingredients.map((i) => JSON.parse(i));
    setRecipe(new Recipe({ ...initialRecipe, ingredients: newIngredients }));
    setLoading(false);
  }, [initialRecipe]);

  const editComplete = () => {
    const newIngredients = recipe.ingredients.map((i) => JSON.stringify(i));
    postEditedRecipe({ ...recipe, ingredients: newIngredients });
    alert("내 레시피에 저장 및 추가되었습니다.");
    navigate("/");
  };

  const editIngredient = ({ index, amount }) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index].amount = amount;
    setRecipe(new Recipe({ ...recipe, ingredients: newIngredients }));
  };

  const deleteIngredient = ({ index }) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);
    setRecipe(new Recipe({ ...recipe, ingredients: newIngredients }));
  };

  const editCookingImg = ({ index, img }) => {
    const newCookingImg = [...recipe.cookingImg];
    newCookingImg[index] = img;
    setRecipe(new Recipe({ ...recipe, cookingImg: newCookingImg }));
  };

  const editCookingOrder = ({ index, order }) => {
    console.log(index, order);
    const newCookingOrder = [...recipe.cookingOrder];
    newCookingOrder[index] = order;
    setRecipe(new Recipe({ ...recipe, cookingOrder: newCookingOrder }));
  };

  return {
    recipe,
    loading,
    editComplete,
    editIngredient,
    deleteIngredient,
    editCookingImg,
    editCookingOrder,
  };
};

export default useRecipeEdit;
