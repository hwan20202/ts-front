import { createContext, useContext, useState, useEffect } from "react";
import Ingredient from "../models/Ingredient";
import { createSavingTypeEnum } from "../utils/createSavingTypeEnum";

const SavingTypeEnum = createSavingTypeEnum();

import {
  getMyIngredients,
  postMyIngredient,
  putMyIngredient,
  deleteMyIngredient,
} from "../services/fetchDashboard";
import {
  putBookmarkedRecipe,
  putEatenRecipe,
  postEditedRecipe,
} from "../services/fetchUserRecipe";
import { postUserPreferences } from "../services/fetchUserInfo";
import Recipe from "../models/Recipe";
import { useAuth } from "./AuthProvider";
const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsBySavingType, setIngredientsBySavingType] = useState({});
  const [expiringIngredients, setExpiringIngredients] = useState([]);

  const fetchIngredients = async () => {
    const data = await getMyIngredients();
    if (data) {
      const ingredients = data.map((ingredient) => {
        return new Ingredient({
          ...ingredient,
        });
      });
      setIngredients(ingredients);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchIngredients();
  }, [isLoggedIn]);

  const addIngredient = (ingredient) => {
    const fetchPostIngredient = async () => {
      const data = await postMyIngredient({
        foodName: ingredient.foodName,
        savingType: ingredient.savingType,
        expirationDate: ingredient.expirationDate,
      });
      if (data) {
        const newIngredient = new Ingredient({
          ...data,
        });
        setIngredients([...ingredients, newIngredient]);
      }
    };
    fetchPostIngredient();
  };

  const deleteIngredient = (ingredient) => {
    const fetchDeleteIngredient = async () => {
      const result = await deleteMyIngredient(ingredient.id);
      if (result.success) {
        setIngredients(ingredients.filter((i) => i.id !== ingredient.id));
      }
    };
    fetchDeleteIngredient();
  };

  const updateIngredient = (ingredient) => {
    const fetchPutIngredient = async () => {
      const data = await putMyIngredient({
        ...ingredient,
      });
      if (data) {
        setIngredients(
          ingredients.map((i) =>
            i.id === ingredient.id ? new Ingredient({ ...ingredient }) : i
          )
        );
      }
    };
    fetchPutIngredient();
  };

  // 추천 레시피
  const loadMoreRecommendedRecipes = async () => {
    const data = await getRecommendedRecipes();
    if (data) {
      const recipes = data.map((recipe) => {
        return new Recipe({ ...recipe });
      });
      setRecommendedRecipes((prev) => [...prev, ...recipes]);
    }
  };

  // 북마크

  const addBookmarkedRecipe = (recipeId) => {
    const fetchPutBookmarkedRecipe = async () => {
      const data = await putBookmarkedRecipe(recipeId);
      if (data) {
        fetchBookmarkedRecipes();
      }
    };
    fetchPutBookmarkedRecipe();
  };

  // 조리 완료

  const addEatenRecipe = (recipeId, type) => {
    const fetchPutEatenRecipe = async () => {
      const data = await putEatenRecipe(recipeId, type);
      if (data) {
        setEatenRecipes([
          ...eatenRecipes,
          new Recipe({
            ...data,
          }),
        ]);
      }
    };
    fetchPutEatenRecipe();
  };

  // 레시피 편집

  const updateEditingRecipe = (recipe) => {
    const fetchPostEditingRecipe = async () => {
      const data = await postEditedRecipe(recipe);
      console.log(data);
      if (data) {
        return data;
      }
    };
    return fetchPostEditingRecipe();
  };

  // 유저 선호도

  const submitUserPreferences = async (tags) => {
    const data = await postUserPreferences(tags);
    if (data) {
      return data;
    }
  };

  return (
    <UserContext.Provider
      value={{
        ingredients,
        addIngredient,
        updateIngredient,
        deleteIngredient,
        ingredientsBySavingType,
        expiringIngredients,

        postUserPreferences,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { useUserContext };
