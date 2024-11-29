import { createContext, useContext, useState } from "react";
import { getRecipe } from "../services/fetchRecipe";
import Recipe from "../models/Recipe";
import {
  getRecipeGeneratedByAI,
  getRecipeSimplifiedByAI,
} from "../services/fetchRecipe";

const RecipeContext = createContext();

const useRecipe = () => {
  return useContext(RecipeContext);
};

// 레시피 상세 + 편집

const RecipeProvider = ({ children }) => {
  // 기본 상세 + 편집 시 초기화 데이터
  const [recipe, setRecipe] = useState(null);
  // 편집 상세 (사용자 직접 입력, AI 변환 데이터)
  const [editRecipe, setEditRecipe] = useState(null);

  const [loading, setLoading] = useState(false);

  const loadRecipe = async (recipeId) => {
    setLoading(true);
    const result = await getRecipe(recipeId);
    const recipe = new Recipe({ ...result });
    setRecipe(recipe);
    setLoading(false);
  };

  const editByUser = async () => {
    setLoading(true);
    setEditRecipe(recipe);
    setLoading(false);
  };

  const generateByAI = async (recipeId) => {
    setLoading(true);
    const result = await getRecipeGeneratedByAI({
      recipeId: recipeId,
      dislikeIngredients: [],
      basicSeasoning: [],
      mustUseIngredients: [],
    });
    const recipe = new Recipe({ ...result });
    setEditRecipe(recipe);
    setLoading(false);
  };

  const simplifyByAI = async (recipeId) => {
    setLoading(true);
    const result = await getRecipeSimplifiedByAI({ recipeId: recipeId });
    const recipe = new Recipe({ ...result });
    setEditRecipe(recipe);
    setLoading(false);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        loadRecipe,
        editRecipe,
        setRecipe,
        editByUser,
        generateByAI,
        simplifyByAI,
        loading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
export { useRecipe };
