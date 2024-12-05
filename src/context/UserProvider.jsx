import { createContext, useContext, useState, useEffect } from "react";
import Ingredient from "../models/Ingredient";
import { createSavingTypeEnum } from "../utils/createSavingTypeEnum";
import { initKakao } from "../utils/kakaoUtlis";
const SavingTypeEnum = createSavingTypeEnum();

import {
  getMyIngredients,
  postMyIngredient,
  putMyIngredient,
  deleteMyIngredient,
} from "../services/fetchDashboard";
import { postEditedRecipe } from "../services/fetchUserRecipe";
import { postUserPreferences } from "../services/fetchUserInfo";
import { useAuth } from "./AuthProvider";
const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [ingredients, setIngredients] = useState([]);
  const [expiringIngredients, setExpiringIngredients] = useState([]);

  const fetchIngredients = async () => {
    const data = await getMyIngredients();
    if (data) {
      console.log(data);
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
    initKakao();
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

  // 북마크

  // const addBookmarkedRecipe = (recipeId) => {
  //   const fetchPutBookmarkedRecipe = async () => {
  //     const data = await putBookmarkedRecipe(recipeId);
  //     if (data) {
  //       fetchBookmarkedRecipes();
  //     }
  //   };
  //   fetchPutBookmarkedRecipe();
  // };

  // 레시피 편집

  const updateEditingRecipe = (recipe) => {
    const fetchPostEditingRecipe = async () => {
      const data = await postEditedRecipe(recipe);
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
