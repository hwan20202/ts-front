import { useState, useEffect } from "react";
import { getPreferencesTagsAll } from "../services/fetchUserInfo";
import { putUserPreferSpicyLevel } from "../services/fetchUserInfo";
import { PreferenceService } from "../services/PreferenceService";

const useUserPreference = () => {
  const { getCategory, getValues, getTags, getEntriesByKey } =
    getPreferencesTagsAll();
  const [preferredTags, setPreferredTags] = useState(getTags());

  const [selectedMethodKey, setSelectedMethodKey] = useState([]);
  const [selectedRecipeType, setSelectedRecipeType] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState([]);
  const [selectedFlavor, setSelectedFlavor] = useState([]);
  const [selectedNutrition, setSelectedNutrition] = useState([]);
  const [selectedHealthObjective, setSelectedHealthObjective] = useState([]);

  const [userPreferences, setUserPreferences] = useState(null);

  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      const preferences = await PreferenceService.getUserPreferences();
      setUserPreferences(preferences);
    };

    fetchUserPreferences();
  }, []);

  const preferenceController = {
    getSelectedMethodKey: () => selectedMethodKey,
    getSelectedRecipeType: () => selectedRecipeType,
    getSelectedStyle: () => selectedStyle,
    getSelectedFlavor: () => selectedFlavor,
    getSelectedNutrition: () => selectedNutrition,
    getSelectedHealthObjective: () => selectedHealthObjective,
    setSelectedMethodKey,
    setSelectedRecipeType,
    setSelectedStyle,
    setSelectedFlavor,
    setSelectedNutrition,
    setSelectedHealthObjective,
    complete: async () => {
      const preferencesResult = await PreferenceService.postUserPreferences([
        ...selectedMethodKey,
        ...selectedRecipeType,
        ...selectedStyle,
        ...selectedFlavor,
        ...selectedNutrition,
        ...selectedHealthObjective,
      ]);
      const spicyLevel = selectedFlavor
        .filter((flavor) => flavor.includes("매운맛"))
        .map((flavor) => flavor.substring(3, 4))
        .reduce((acc, curr) => Math.max(acc, curr), 1);
      const spicyLevelResult = await putUserPreferSpicyLevel(spicyLevel);
      if (!preferencesResult || !spicyLevelResult) {
        throw new Error("초기 설정 실패");
      }
      return true;
    },
  };

  const allergyController = {
    allergies,
    set: (allergies) => setAllergies(allergies),
    add: (allergy) => setAllergies((prev) => [...prev, allergy]),
    remove: (allergy) =>
      setAllergies((prev) => prev.filter((a) => a !== allergy)),
  };

  return {
    preferredTags,
    allergyController,
    userPreferences,
    preferenceController,
  };
};

export default useUserPreference;
