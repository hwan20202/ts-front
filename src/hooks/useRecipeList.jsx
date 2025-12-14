import { useState, useEffect } from "react";
import { getRecipeList } from "../services/fetchRecipe";
import { useAuth } from "../context/AuthProvider";
const useRecipeList = ({ path }) => {
  const { isLoggedIn } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);

  const loadMore = async () => {
    setLoading(true);
    const data = await getRecipeList(path, page);
    if (!data.success) {
      setError(true);
      setLoading(false);
      return false;
    }
    if (data.success && data.data?.length > 0) {
      setRecipes((prev) => [...prev, ...data.data]);
      setPage((prev) => prev + 1);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    loadMore();
  }, [isLoggedIn]);

  return { recipes, loading, error, loadMore };
};

export default useRecipeList;
