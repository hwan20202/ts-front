import { useState, useEffect } from "react";
import { getRecipeList } from "../services/fetchRecipe";
import { useAuth } from "../context/AuthProvider";
const useRecipeList = ({ path }) => {
  const { isLoggedIn } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);

  const fetchRecipes = async () => {
    const result = await getRecipeList(path, page);
    if (result.success) {
      setRecipes(result.data);
      setPage((prev) => prev + 1);
      setLoading(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchRecipes();
  }, [isLoggedIn]);

  const loadMore = async () => {
    setLoading(true);
    const data = await getRecipeList(path, page);
    if (data.success) {
      setRecipes((prev) => [...prev, ...data.data]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }
  };

  return { recipes, loading, error, loadMore };
};

export default useRecipeList;
