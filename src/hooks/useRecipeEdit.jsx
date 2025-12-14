import { useState, useEffect } from "react";
import { getRecipe } from "../services/fetchRecipe";
import { putEditedRecipe } from "../services/fetchUserRecipe";
import Recipe from "../models/Recipe";
import { useNavigate } from "react-router-dom";

const useRecipeEdit = (recipeId) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipeId) return;
    const fetchRecipe = async () => {
      const recipe = await getRecipe("custom", recipeId);
      setRecipe(new Recipe({ ...recipe }));
      setLoading(false);
    };
    fetchRecipe();
  }, [recipeId]);

  const editComplete = () => {
    // const newIngredients = recipe.ingredients.map((i) => JSON.stringify(i));
    // postEditedRecipe({ ...recipe, ingredients: newIngredients });
    putEditedRecipe({ ...recipe });
  };

  const addIngredient = (items) => {
    const newIngredients = [...recipe.ingredients, ...items];
    setRecipe(new Recipe({ ...recipe, ingredients: newIngredients }));
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
    const newCookingImg = [...recipe.cooking_img];
    newCookingImg[index] = img;
    setRecipe(new Recipe({ ...recipe, cooking_img: newCookingImg }));
  };

  const editCookingOrder = ({ index, order }) => {
    const newCookingOrder = [...recipe.cooking_order];
    newCookingOrder[index] = order;
    setRecipe(new Recipe({ ...recipe, cooking_order: newCookingOrder }));
  };

  const addCookingOrder = (item) => {
    const newCookingOrder = [...recipe.cooking_order, item];
    setRecipe(new Recipe({ ...recipe, cooking_order: newCookingOrder }));
  };

  return {
    recipe,
    loading,
    editComplete,
    editIngredient,
    deleteIngredient,
    addIngredient,
    editCookingImg,
    editCookingOrder,
    addCookingOrder,
  };
};

export default useRecipeEdit;
