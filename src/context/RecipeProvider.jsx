import { createContext, useContext, useState, useEffect } from "react";
import { getRecipe, getIsBookmarked } from "../services/fetchRecipe";
import { share as shareByKakao } from "../utils/kakaoUtlis";
import Recipe from "../models/Recipe";

import {
  getRecipeGeneratedByAI,
  getRecipeSimplifiedByAI,
} from "../services/fetchRecipe";
import { putBookmarkedRecipe } from "../services/fetchUserRecipe";

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
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!recipe) return;
    const { id } = recipe;
    const checkIsBookmarked = async () => {
      const result = await getIsBookmarked(id);
      setIsBookmarked(result);
    };
    checkIsBookmarked();
  }, [recipe]);

  const loadRecipe = async (tag, recipeId) => {
    setLoading(true);
    const result = await getRecipe(tag, recipeId);
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
    // console.log("generateByAI clicked", recipeId);
    setLoading(true);
    const result = await getRecipeGeneratedByAI({
      original_recipe_id: recipeId,
      dislike_ingredients: [],
      basic_seasoning: [],
      must_ues_ingredients: [],
    });
    console.log(result);
    const recipe = new Recipe({
      ...result.data.before,
      cooking_order: result.data.after.recipe_cooking_order || [],
      cooking_time: result.data.after.recipe_cooking_time || "",
      difficulty: result.data.after.recipe_difficulty || "",
      ingredients: result.data.after.recipe_ingredients || [],
      title: result.data.after.recipe_menu_name || "",
      recipe_type: result.data.after.recipe_recipe_type || [],
      tips: result.data.after.recipe_tips || [],
    });
    setEditRecipe(recipe);
    setLoading(false);
  };

  const simplifyByAI = async (recipeId) => {
    console.log("simplifyByAI clicked", recipeId);
    setLoading(true);
    const result = await getRecipeSimplifiedByAI({ recipeId: recipeId });
    const recipe = new Recipe({ ...result });
    setEditRecipe(recipe);
    setLoading(false);
  };

  const share = async () => {
    if (!recipe) return;
    const { id, tag } = recipe;
    console.log("share clicked", id, tag);
    if (tag === "original") {
      shareByKakao(`recipe/original/${id}`);
    } else if (tag === "custom") {
      const url = await fetch(
        `http://localhost:8080/api/recipe/custom/share/${id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await url.json();
      console.log(data);
      const path = `recipe/share/${data.url}`;
      shareByKakao(path);
    }
  };

  const bookmark = async () => {
    const { id } = recipe;
    const result = await putBookmarkedRecipe(id);
    if (result) {
      setIsBookmarked(!isBookmarked);
    }
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
        share,
        bookmark,
        isBookmarked,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
export { useRecipe };
