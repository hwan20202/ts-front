const serverUrl = import.meta.env.VITE_APP_SERVER_URL || "";

export const getIsSetPreferences = async () => {
  const response = await fetch(
    `${serverUrl}/api/userinfo/me/preferences/status`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to get is set preferences");
  }
  const result = await response.json();
  return result.is_checked;
};

export const getIsSetHealth = async () => {
  const response = await fetch(`${serverUrl}/api/userinfo/me/health/status`, {
    method: "GET",
    credentials: "include",
  });
};
