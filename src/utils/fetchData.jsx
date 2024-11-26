import parseRecipe from "./parseRecipe.jsx";

const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

export const login = async () => {
  const path = "/api/oauth2/authorization/kakao";
  window.location.href = `${serverUrl}${path}`;
};

export const fetchUserInfo = async () => {
  const path = "/api/healthcheck/userinfo";
  try {
    const response = await fetch(`${serverUrl}${path}`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      // const data = await response.json();
      const data = response;
      return { success: true, data }; // 성공 시 사용자 데이터 반환
    } else {
      // 서버에서 200 이외의 상태 코드를 반환한 경우
      return { success: false, error: `Failed with status ${response.status}` };
    }
  } catch (error) {
    // 네트워크 오류 또는 예외 발생 시
    console.error("Error checking session validity:", error);
    return { success: false, error: "Network error or server unreachable" };
  }
};

//TEST ONLY
//Todo: 삭제 필요
const getRandomExpirationDate = (minDays, maxDays) => {
  const today = new Date();
  const randomDays =
    Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  const expirationDate = new Date(today.setDate(today.getDate() + randomDays));
  return expirationDate.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식으로 변환
};

export const fetchDashboard = async () => {
  const path = "/api/food/my_foods";
  try {
    const response = await fetch(`${serverUrl}${path}`, {
      method: "get",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  } catch (e) {
    console.log("fetchDashboard " + e.message);
  }
};

export const fetchUserData = async () => {
  const path = "/api/healthcheck/userinfo";
  const response = await fetch(`${serverUrl}${path}`, {
    method: "GET",
    credentials: "include",
  });
};
