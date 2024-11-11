const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

export const fetchUserLogOut = async () => {
  const path = "/api/logout";
  const response = await fetch(`${serverUrl}${path}`, {
    method: "POST",
    credentials: "include",
  });
};
