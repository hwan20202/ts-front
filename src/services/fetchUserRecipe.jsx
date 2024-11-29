const serverUrl = import.meta.env.VITE_APP_SERVER_URL || "";

// 레시피 북마크

export const putBookmarkedRecipe = async (recipeId) => {
  const endpoint = `${serverUrl}/api/recipe/${recipeId}/bookmark`;
  const response = await fetch(endpoint, {
    method: "PUT",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to post bookmarked recipe");
  }
  const data = await response.json();
  return data;
};

// 레시피 조리 완료

export const putEatenRecipe = async (recipeId, type) => {
  const endpoint = `${serverUrl}/api/recipe/${recipeId}/eat?type=${type}`;
  const response = await fetch(endpoint, {
    method: "PUT",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to post eaten recipe");
  }
  const data = await response.json();
  console.log(data);
  return data;
};

// 레시피 편집

class EditedRecipeResponse {
  constructor({
    title,
    mainImg,
    typeKey,
    methodKey,
    servings,
    cookingTime,
    difficulty,
    ingredients,
    cookingOrder,
    cookingImg,
    hashtag,
    tips,
    recipeType,
  }) {
    this.title = title;
    this.mainImg = mainImg;
    this.typeKey = typeKey;
    this.methodKey = methodKey;
    this.servings = servings;
    this.cookingTime = cookingTime;
    this.difficulty = difficulty;
    this.ingredients = ingredients;
    this.cookingOrder = cookingOrder;
    this.cookingImg = cookingImg;
    this.hashtag = hashtag;
    this.tips = tips;
    this.recipeType = recipeType;
  }
}

export const postEditedRecipe = async (recipe) => {
  const path = `/api/recipe/custom/save`;
  try {
    const response = await fetch(`${serverUrl}${path}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new EditedRecipeResponse({ ...recipe })),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("postEditedRecipe error");
    }
  } catch (e) {
    console.log(e.message);
  }
};
