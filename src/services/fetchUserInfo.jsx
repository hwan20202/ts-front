import Ingredient from "../models/Ingredient";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL || "";

const fakePreferencesTags = {
  methodKey: [
    "구이",
    "볶음",
    "찜",
    "튀김",
    "조림",
    "삶기",
    "부침",
    "무침",
    "생식",
    "전",
  ],
  recipeType: [
    "주식",
    "반찬",
    "국/스프",
    "죽",
    "디저트",
    "샐러드",
    "음료",
    "간편식",
    "해산물",
  ],
  style: ["한식", "양식", "중식", "일식", "퓨전", "전통식"],
  flavor: [
    "매운맛1단계",
    "매운맛2단계",
    "매운맛3단계",
    "매운맛4단계",
    "매운맛5단계",
    "담백한맛",
    "새콤달콤한맛",
  ],
  nutrition: ["건강식", "고단백", "채식", "저칼로리", "고섬유", "저당식"],
  healthObjective: ["소화촉진", "장건강", "체중조절", "특별식", "가벼운"],
};

export const getFakePreferencesTags = () => {
  const tags = fakePreferencesTags;
  const categories = Object.keys(tags);
  const values = [];
  categories.map((category) => values.push(...tags[category]));
  const categoryNamesEnum = {
    nutrition: "영양",
    healthObjective: "건강목표",
    recipeType: "요리 종류",
    style: "스타일",
    flavor: "맛",
    methodKey: "요리법",
  };

  return {
    getTags() {
      return tags;
    },
    getCategory() {
      return categories;
    },
    getValues(category) {
      if (!category) {
        return values;
      }
      return fakePreferencesTags[category];
    },
    getNameCategory(category) {
      return categoryNamesEnum[category];
    },
  };
};

export const postUserPreferences = async (tags) => {
  const path = `/api/userinfo/prefer`;
  const response = await fetch(`${serverUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ types: tags }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to post user preferences");
  }
  const data = await response.json();
  return data;
};

export const getFakeDislikedIngredients = () => {
  return [
    new Ingredient({ id: 1, foodName: "양파", foodType: "채소" }),
    new Ingredient({ id: 2, foodName: "마늘", foodType: "채소" }),
    new Ingredient({ id: 3, foodName: "버섯", foodType: "채소" }),
    new Ingredient({ id: 4, foodName: "오이", foodType: "채소" }),
    new Ingredient({ id: 5, foodName: "우유", foodType: "유제품" }),
    new Ingredient({ id: 6, foodName: "초코 우유", foodType: "유제품" }),
    new Ingredient({ id: 7, foodName: "바나나 우유", foodType: "유제품" }),
  ];
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
