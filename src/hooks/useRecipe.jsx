import { getRecipe } from "../services/fetchRecipe.jsx";
import Recipe from "../models/Recipe.jsx";
import { useState, useEffect } from "react";
import { putEatenRecipe } from "../services/fetchUserRecipe.jsx";
const useRecipe = (recipeId) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecipe(recipeId);
      setRecipe(new Recipe(data));
      setLoading(false);
    };
    fetchData();
  }, []);

  const eatComplete = () => {
    putEatenRecipe(recipeId, "original");
    alert("캘린더에 추가되었습니다.");
  };

  return { recipe, loading, eatComplete };
};

export default useRecipe;
