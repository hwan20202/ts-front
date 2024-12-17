import { useState, useEffect } from "react";
import { getRecipeList } from "../services/fetchRecipe";
import { useAuth } from "../context/AuthProvider";
const useRecipeList = ({ path }) => {
  const { isLoggedIn } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRecipes = async () => {
    const result = await getRecipeList(path);
    if (result.success) {
      setRecipes(result.data);
      setLoading(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchRecipes();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    const data = await getRecipeList(path);
    if (data.success) {
      setRecipes([...recipes, ...data.data]);
      setLoading(false);
    }
  };

  return { recipes, loading, error, loadMore };
};

export default useRecipeList;
