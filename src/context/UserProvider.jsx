import { createContext, useContext, useState, useEffect } from "react";
import Ingredient from "../models/Ingredient";
import { createSavingTypeEnum } from "../utils/createSavingTypeEnum";
import { initKakao } from "../utils/kakaoUtlis";
import { getIsSetPreferences } from "../services/fetchUserPreferenece";
import {
  getMyIngredients,
  postMyIngredient,
  putMyIngredient,
  deleteMyIngredient,
} from "../services/fetchDashboard";
import { postEditedRecipe } from "../services/fetchUserRecipe";
import { postUserPreferences } from "../services/fetchUserInfo";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [isSetPreferences, setIsSetPreferences] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [expiringIngredients, setExpiringIngredients] = useState([]);
  const navigate = useNavigate();

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

  const fetchIsSetPreferences = async () => {
    const data = await getIsSetPreferences();
    if (data) {
      setIsSetPreferences(data);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchIngredients();
    fetchIsSetPreferences();
    initKakao();

    // if (!isSetPreferences) {
    //   navigate("/user/init/preference");
    // }
  }, [isLoggedIn]);

  const addIngredient = (ingredient) => {
    const fetchPostIngredient = async () => {
      const data = await postMyIngredient({
        food_name: ingredient.food_name,
        saving_type: ingredient.saving_type,
        expiration_date: ingredient.expiration_date,
      });
      if (data) {
        const newIngredient = new Ingredient({
          ...data,
        });
        setIngredients((prev) => [...prev, newIngredient]);
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
        setIngredients((prev) =>
          prev.map((i) =>
            i.id === ingredient.id ? new Ingredient({ ...ingredient }) : i
          )
        );
      }
    };
    fetchPutIngredient();
  };

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
