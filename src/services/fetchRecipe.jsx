const serverUrl = import.meta.env.VITE_APP_SERVER_URL || "";

export const recipePath = {
  recommended: "/api/recipe/recommend",
  bookmarked: "/api/recipe/bookmark/all",
  eaten: "/api/recipe/eat/all",
  my: "/api/recipe/custom/all",
  aiGenerate: "/api/recipe/custom/ai/generate",
  aiSimplify: "/api/recipe/custom/ai/simplify",
};

// 레시피 조회

export const getRecipe = async (recipeId) => {
  const path = `/api/recipe/${recipeId}`;
  try {
    const response = await fetch(`${serverUrl}${path}`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      // recipe parse
      const data = await response.json();
      return data;
    } else {
      console.log("fetchRecipe error");
      return;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getRecipeList = async (path) => {
  try {
    const response = await fetch(`${serverUrl}${path}`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        recipes: data,
      };
    } else {
      console.log("fetchRecipeList error");
      return {
        success: false,
      };
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getRecipeGeneratedByAI = async ({
  recipeId,
  dislikeIngredients,
  basicSeasoning,
  mustUseIngredients,
}) => {
  try {
    const response = await fetch(`${serverUrl}${recipePath.aiGenerate}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        originalRecipeId: recipeId,
        dislikeIngredients, // [싫어하는 재료]
        basicSeasoning, // [기본 양념]
        mustUseIngredients, // [필수 재료]
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      console.log("generateByAI error");
      return { success: false };
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getRecipeSimplifiedByAI = async ({ recipeId }) => {
  try {
    const response = await fetch(
      `${serverUrl}${recipePath.aiSimplify}/${recipeId}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      console.log("simplifyByAI error");
      return { success: false };
    }
  } catch (e) {
    console.log(e.message);
  }
};

// 북마크 여부 조회
export const getIsBookmarked = async (recipeId) => {
  const path = `/api/recipe/${recipeId}/bookmark`;
  try {
    const response = await fetch(`${serverUrl}${path}`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data.isBookmarked;
    } else {
      console.log("fetchIsBookmarked error");
      return;
    }
  } catch (e) {
    console.log(e.message);
  }
};
