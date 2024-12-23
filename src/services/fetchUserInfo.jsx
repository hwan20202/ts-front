import Ingredient from "../models/Ingredient";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL || "";

const preferencesTags = {
  구이: "methodKey",
  볶음: "methodKey",
  찜: "methodKey",
  튀김: "methodKey",
  조림: "methodKey",
  삶기: "methodKey",
  부침: "methodKey",
  무침: "methodKey",
  생식: "methodKey",
  전: "methodKey",
  주식: "recipeType",
  반찬: "recipeType",
  "국/스프": "recipeType",
  죽: "recipeType",
  디저트: "recipeType",
  샐러드: "recipeType",
  음료: "recipeType",
  간편식: "recipeType",
  해산물: "recipeType",
  한식: "style",
  양식: "style",
  중식: "style",
  일식: "style",
  퓨전: "style",
  전통식: "style",
  매운맛1단계: "flavor",
  매운맛2단계: "flavor",
  매운맛3단계: "flavor",
  매운맛4단계: "flavor",
  매운맛5단계: "flavor",
  담백한맛: "flavor",
  새콤달콤한맛: "flavor",
  건강식: "nutrition",
  고단백: "nutrition",
  채식: "nutrition",
  저칼로리: "nutrition",
  고섬유: "nutrition",
  저당식: "nutrition",
  소화촉진: "healthObjective",
  장건강: "healthObjective",
  체중조절: "healthObjective",
  특별식: "healthObjective",
  가벼운: "healthObjective",
};

const preferenceCategories = {
  methodKey: "조리 방법",
  recipeType: "요리 종류",
  style: "스타일",
  flavor: "맛",
  nutrition: "영양",
  healthObjective: "건강목표",
};

export const getPreferencesTagsAll = () => {
  const tags = Object.keys(preferencesTags);
  const categories = Object.keys(preferenceCategories);

  return {
    getTags() {
      return Object.entries(preferencesTags);
    },
    getCategory() {
      return categories;
    },
    getValues(category) {
      if (!category) {
        return null;
      }
      return Object.entries(preferencesTags)
        .filter(([key, value]) => value === category)
        .map(([key, value]) => key);
    },
    getEntriesByKey(key) {
      return Object.entries(preferencesTags).find(
        ([_key, _value]) => _key === key
      );
    },
    getNameCategory(category) {
      return preferenceCategories[category];
    },
  };
};

export const putUserPreferSpicyLevel = async (value) => {
  const path = `/api/userinfo/settings/spicy-level`;
  const params = new URLSearchParams();
  params.append("value", value);
  const response = await fetch(`${serverUrl}${path}?${params.toString()}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to post user preferences");
  }
  const data = await response.json();
  return data;
};

export const getFakeAllergies = () => {
  return [
    "대두",
    "우유",
    "땅콩",
    "견과류",
    "생선",
    "조개류",
    "난류",
    "아황산류",
  ];
};

export const postUserDislikedIngredients = async (ingredients) => {
  const path = `/api/userinfo/disliked`;
  const response = await fetch(`${serverUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to post user disliked ingredients");
  }
  const data = await response.json();
  return data;
};

export const postUserAllergies = async (allergy) => {
  const path = `/api/userinfo/allergy`;
  const response = await fetch(`${serverUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ allergy }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to post user allergies");
  }
  const data = await response.json();
  return data;
};
