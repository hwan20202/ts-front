const serverUrl = import.meta.env.VITE_APP_SERVER_URL || "";

export const recipePath = {
  recommended: "/api/recipe/recommend",
  bookmarked: "/api/recipe/bookmark/all",
  eaten: "/api/recipe/eat/all",
  my: "/api/recipe/custom/all",
  aiGenerate: "/api/recipe/custom/ai/generate",
  aiSimplify: "/api/recipe/custom/simplify",
  aiHealthy: "/api/recipe/custom/nutrients",
};

export const getsharedRecipeUrl = async (recipeId) => {
  const path = `/api/recipe/custom/share/${recipeId}`;
  const response = await fetch(`${serverUrl}${path}`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  if (data.success) {
    return data.data.url;
  } else {
    return null;
  }
};

// 레시피 조회
// tag: [custom, original]
export const getRecipe = async (tag, recipeId) => {
  console.log(tag, recipeId);
  const path = `/api/recipe/${tag}/${recipeId}`;
  try {
    let response;
    if (tag === "custom" || tag === "shared") {
      response = await fetch(`${serverUrl}${path}`, {
        method: "GET",
        credentials: "include",
      });
    } else if (tag === "original") {
      response = await fetch(`${serverUrl}${path}`, {
        method: "GET",
      });
    }
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

export const getRecipeList = async (path, page) => {
  try {
    const response = await fetch(`${serverUrl}${path}?page=${page}`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data,
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
  original_recipe_id,
  dislike_ingredients,
  must_use_ingredients,
}) => {
  try {
    const response = await fetch(`${serverUrl}${recipePath.aiGenerate}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        original_recipe_id,
        dislike_ingredients,
        must_use_ingredients,
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
    console.log("generateByAI error", e);
  }
};

export const getRecipeSimplifiedByAI = async ({ recipeId }) => {
  try {
    const response = await fetch(
      `${serverUrl}${recipePath.aiSimplify}/${recipeId}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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

export const getRecipeHealthyByAI = async ({ recipeId, mealCount }) => {
  try {
    const response = await fetch(
      `${serverUrl}${recipePath.aiHealthy}/${recipeId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meals_a_day: mealCount,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      console.log("healthyByAI error");
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
      return data.is_bookmarked;
    } else {
      console.log("fetchIsBookmarked error");
      return;
    }
  } catch (e) {
    console.log(e.message);
  }
};
