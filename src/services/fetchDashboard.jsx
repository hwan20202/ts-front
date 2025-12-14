const serverUrl = import.meta.env.VITE_APP_SERVER_URL || "";

export const getMyIngredients = async () => {
  const endpoint = `${serverUrl}/api/food/my_foods`;

  const response = await fetch(endpoint, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch ingredients");
  }
  const data = await response.json();
  return data;
};

export const deleteMyIngredient = async (id) => {
  const endpoint = `${serverUrl}/api/food/${id}`;
  const response = await fetch(endpoint, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to delete ingredient");
  }
  return { success: true };
};

export const postMyIngredient = async (ingredient) => {
  const endpoint = `${serverUrl}/api/food`;
  const response = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });
  if (!response.ok) {
    throw new Error("Failed to post ingredient");
  }
  const data = await response.json();
  return data;
};

export const putMyIngredient = async (ingredient) => {
  const endpoint = `${serverUrl}/api/food/${ingredient.id}`;
  const response = await fetch(endpoint, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      saving_type: ingredient.saving_type,
      expiration_date: ingredient.expiration_date,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to put ingredient");
  }
  const data = await response.json();
  return data;
};
