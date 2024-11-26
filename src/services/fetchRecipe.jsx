const serverUrl = import.meta.env.VITE_APP_SERVER_URL || "";
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

// 북마크 여부 조회
export const getIsBookmarked = async (recipeId) => {
  const path = `/api/recipe/${recipeId}/bookmark`;
  try {
    const response = await fetch(`${serverUrl}${path}`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      console.log(response);
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
