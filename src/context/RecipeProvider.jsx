import { createContext, useContext, useState, useEffect } from "react";
import { getRecipe, getIsBookmarked } from "../services/fetchRecipe";
import { share as shareByKakao } from "../utils/kakaoUtlis";
import Recipe from "../models/Recipe";
import { AiComment, AiResponse } from "../models/AiResponse";
import { saveDataToSession, loadDataFromSession } from "../utils/sessionUtils";
import {
  getRecipeGeneratedByAI,
  getRecipeSimplifiedByAI,
  getRecipeHealthyByAI,
} from "../services/fetchRecipe";
import {
  putBookmarkedRecipe,
  postEditedRecipe,
} from "../services/fetchUserRecipe";
import { getsharedRecipeUrl } from "../services/fetchRecipe";
const RecipeContext = createContext();

const toRecipe = ({
  recipe_cooking_order,
  recipe_cooking_time,
  recipe_difficulty,
  recipe_ingredients,
  recipe_menu_name,
  recipe_recipe_type,
  recipe_tips,
}) => {
  return {
    cooking_order: recipe_cooking_order || [],
    cooking_time: recipe_cooking_time || "",
    difficulty: recipe_difficulty || "",
    ingredients: recipe_ingredients || [],
    title: recipe_menu_name || "",
    recipe_type: recipe_recipe_type || [],
    tips: recipe_tips || [],
  };
};

const useRecipe = () => {
  return useContext(RecipeContext);
};

// 레시피 상세 + 편집

const RecipeProvider = ({ children }) => {
  // 기본 상세 + 편집 시 초기화 데이터
  const [recipe, setRecipe] = useState(null);
  // 편집 상세 (사용자 직접 입력, AI 변환 데이터)
  const [editRecipe, setEditRecipe] = useState(null);
  const [aiEditRecipe, setAiEditRecipe] = useState(null);
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

  const modifyRecipe = async () => {
    setLoading(true);
    const result = await postEditedRecipe(recipe);
    setLoading(false);
    return result;
  };

  const createAiResponse = (result) => {
    const recipeId = result.data.custom_recipe_id;
    const aiComment = new AiComment({
      ...result.data.after,
    });
    return new AiResponse(recipeId, aiComment);
  };

  const generateByAI = async ({ recipeId, dislikedIngredients }) => {
    setLoading(true);
    const result = await getRecipeGeneratedByAI({
      original_recipe_id: recipeId,
      dislike_ingredients: dislikedIngredients,
      basic_seasoning: [],
      must_use_ingredients: [],
    });
    if (!result.success || !result.data.after.recipe_cooking_order) {
      setLoading(false);
      return;
    }

    const aiResponse = createAiResponse(result);
    saveDataToSession(result.data.custom_recipe_id, aiResponse);
    setLoading(false);
    return aiResponse;
  };

  const simplifyByAI = async ({ recipeId }) => {
    setLoading(true);
    const result = await getRecipeSimplifiedByAI({ recipeId: recipeId });
    if (!result.success) {
      setLoading(false);
      return;
    }

    const aiResponse = createAiResponse(result);
    saveDataToSession(result.data.custom_recipe_id, aiResponse);
    setLoading(false);
    return aiResponse;
  };

  const healthyByAI = async ({ recipeId, mealCount }) => {
    setLoading(true);
    const result = await getRecipeHealthyByAI({
      recipeId: recipeId,
      mealCount: mealCount,
    });
    if (!result.success) {
      setLoading(false);
      return;
    }

    const aiResponse = createAiResponse(result);
    saveDataToSession(result.data.custom_recipe_id, aiResponse);
    setLoading(false);
    return;
  };

  const share = async () => {
    if (!recipe) return;
    const { id, tag } = recipe;
    if (tag === "original") {
      shareByKakao({ path: `recipe/original/${id}`, ...recipe });
    } else if (tag === "custom") {
      const url = await getsharedRecipeUrl(id);
      console.log(url);
      const path = `recipe/share/${url}`;
      shareByKakao({ path, ...recipe });
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
        modifyRecipe,
        generateByAI,
        simplifyByAI,
        healthyByAI,
        loading,
        share,
        bookmark,
        isBookmarked,
        aiEditRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
export { useRecipe };
