const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

export const fetchIngredientRegister = async (ingredients) => {
  const path = "/api/food";
  const response = await fetch(`${serverUrl}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...ingredients,
    }),
  });
  if (!response.ok) {
    return { success: false, error: response.statusText };
  }
  const data = await response.json();
  return { success: true, data };
};

export const fetchIngredientDelete = async (id) => {
  const path = `/api/food/${id}`;
  const response = await fetch(`${serverUrl}${path}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    return { success: false, error: response.statusText };
  }
  return { success: true };
};
