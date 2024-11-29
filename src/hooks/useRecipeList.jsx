import { useState, useEffect } from "react";
import { getRecipeList } from "../services/fetchRecipe";

const useRecipeList = ({ path }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRecipes = async () => {
    const result = await getRecipeList(path);
    if (result.success) {
      setRecipes(result.recipes);
      setLoading(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const data = await getRecipeList(path);
    if (data.success) {
      setRecipes([...recipes, ...data.recipes]);
      setLoading(false);
    }
  };

  return { recipes, loading, error, loadMore };
};

export default useRecipeList;
