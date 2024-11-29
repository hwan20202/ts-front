import { useState, useEffect } from "react";
import {
  getFakePreferencesTags,
  getFakeDislikedIngredients,
  getFakeAllergies,
} from "../services/fetchUserInfo";

const useUserPreference = () => {
  const { getTags } = getFakePreferencesTags();
  const [preferredTags, setPreferredTags] = useState(getTags());
  const [dislikedIngredients, setDislikedIngredients] = useState(
    getFakeDislikedIngredients()
  );
  const [allergies, setAllergies] = useState(getFakeAllergies());

  useEffect(() => {}, []);

  return { preferredTags, dislikedIngredients, allergies };
};

export default useUserPreference;
