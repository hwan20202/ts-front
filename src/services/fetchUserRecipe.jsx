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
  return response.ok;
};

// 레시피 조리 완료

export const putEatenRecipe = async ({ id, tag }) => {
  const endpoint = `${serverUrl}/api/recipe/${id}/eat?type=${tag}`;
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
    main_img,
    type_key,
    method_key,
    servings,
    cooking_time,
    difficulty,
    ingredients,
    cooking_order,
    cooking_img,
    hashtag,
    tips,
    recipe_type,
  }) {
    this.title = title;
    this.main_img = main_img;
    this.type_key = type_key;
    this.method_key = method_key;
    this.servings = servings;
    this.cooking_time = cooking_time;
    this.difficulty = difficulty;
    this.ingredients = ingredients;
    this.cooking_order = cooking_order;
    this.cooking_img = cooking_img;
    this.hashtag = hashtag;
    this.tips = tips;
    this.recipe_type = recipe_type;
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
