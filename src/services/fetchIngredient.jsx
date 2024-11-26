const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

const getIngredientListByName = async (keyword) => {
  const endpoint = `${serverUrl}/api/food/search?food=${keyword}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Failed to fetch ingredient list");
  }
  const data = await response.json();
  return data;
};

export { getIngredientListByName };
