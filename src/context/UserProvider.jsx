import { createContext, useContext, useState, useEffect } from "react";
import Ingredient from "../models/Ingredient";
import { initKakao } from "../utils/kakaoUtlis";
import {
  getMyIngredients,
  postMyIngredient,
  putMyIngredient,
  deleteMyIngredient,
} from "../services/fetchDashboard";
import { postEditedRecipe } from "../services/fetchUserRecipe";
import { PreferenceService } from "../services/PreferenceService";
import { HealthInfoService } from "../services/HealthInfoService";
import { getUserInfo } from "../services/fetchUserInfo";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import useUserHealthInfo from "../hooks/useUserHealthInfo";
import useUserPreference from "../hooks/useUserPreference";
const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [cookingLevel, setCookingLevel] = useState("");
  const [spicyLevel, setSpicyLevel] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [isSetPreferences, setIsSetPreferences] = useState(null);
  const [isSetHealth, setIsSetHealth] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [expiringIngredients, setExpiringIngredients] = useState([]);
  const navigate = useNavigate();

  const { healthInfoController } = useUserHealthInfo();
  const { preferenceController, allergyController } = useUserPreference();

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

  const checkIsSetPreferences = async () => {
    if (!isLoggedIn) return;
    const isSetPreferences = await PreferenceService.isSetPreferences();
    if (!isSetPreferences) {
      setIsSetPreferences(false);
    } else {
      setIsSetPreferences(true);
    }
  };

  const checkIsSetHealth = async () => {
    if (!isLoggedIn) return;
    const isSetHealth = await HealthInfoService.isSetHealthInfo();
    if (!isSetHealth) {
      setIsSetHealth(false);
    } else {
      setIsSetHealth(true);
    }
  };

  const fetchUserInfo = async () => {
    const info = await getUserInfo();
    if (info) {
      healthInfoController.setAge(info.age);
      healthInfoController.setGender(info.gender);
      healthInfoController.setActivityLevel(info.activity_level);
      healthInfoController.setHeight(info.height);
      healthInfoController.setWeight(info.weight);
      setUsername(info.username);
      setCookingLevel(info.cooking_level);
      setSpicyLevel(info.spicy_level);
      allergyController.set(info.allergy);
    }
  };

  useEffect(() => {
    if (isSetPreferences === false) {
      navigate("/user/init/preference");
    }
  }, [isSetPreferences, isSetHealth]);

  useEffect(() => {
    if (isSetPreferences === true && isSetHealth === false) {
      navigate("/user/init/health");
    }
  }, [isSetPreferences, isSetHealth]);

  useEffect(() => {
    if (!isLoggedIn) return;

    fetchUserInfo();
    fetchIngredients();
    checkIsSetPreferences();
    checkIsSetHealth();
    initKakao();

    if (isSetPreferences !== null && !isSetPreferences) {
      navigate("/user/init/preference");
    }
    if (isSetHealth !== null && !isSetHealth) {
      navigate("/user/init/health");
    }
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

  // 유저 선호도

  const submitUserPreferences = async (tags) => {
    const data = await PreferenceService.postUserPreferences(tags);
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

        submitUserPreferences,
        setIsSetPreferences,
        healthInfoController,
        allergyController,
        preferenceController,

        username,
        cookingLevel,
        spicyLevel,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { useUserContext };
