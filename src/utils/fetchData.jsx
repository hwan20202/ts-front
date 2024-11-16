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

export const fetchRecipe = async (keyword) => {
  if (!keyword) {
    return parseRecipe();
  }

  const path = "/api/recipe";
  const query = "?type=" + key;
  try {
    const response = await fetch(`${serverUrl}${path}${query}`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      // recipe parse
      const data = await response.json();
      return parseRecipe(data);
    } else {
      return;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchSearchByMenu = async (keyword) => {
  const path = "/api/recipe";
  const body = {
    menuName: keyword,
  };
  try {
    const response = await fetch(`${serverUrl}${path}`, {
      method: "post",
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (response) {
      // console.log(response);
      return {
        first: parseRecipe(),
        second: parseRecipe(),
      };
    }
  } catch (e) {
    return {
      first: parseRecipe(),
      second: parseRecipe(),
    };
  }
};

export const fetchSearchByAI = async (keyword) => {
  try {
    console.log(`${keyword} searched!`);
    const response = await fetch(serverUrl, {
      method: "post",
    });
    if (response) {
      // response = {fist(recipe): {}, second(recipe): {}}
      // recipe parse
      return {
        first: parseRecipe(),
      };
    }
  } catch (e) {
    return {
      first: parseRecipe(),
    };
  }
};

export const fetchSetBookMark = async (recipeId) => {
  const path = `/recipe/bookmark`;
  const pathvar = `/${recipeId}`;
  try {
    const response = await fetch(`${serverUrl}${path}${pathvar}`, {
      method: "post",
    });
    if (response) {
      // console.log(response);
      return;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchMealDone = async (recipeId) => {
  const path = `/recipe/eat`;
  const pathvar = `/${recipeId}`;
  try {
    const response = await fetch(`${serverUrl}${path}${pathvar}`, {
      method: "post",
    });
    if (response) {
      // console.log(response);
      return;
    }
  } catch (e) {
    console.log(e.message);
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
      return [
        {
          name: "쌀",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "실온",
          group: "곡류",
        },
        {
          name: "보리",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "실온",
          group: "곡류",
        },
        {
          name: "밀가루",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "실온",
          group: "곡류",
        },
        {
          name: "닭고기",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "냉장",
          group: "단백질",
        },
        {
          name: "돼지고기",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "냉장",
          group: "단백질",
        },
        {
          name: "계란",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "냉장",
          group: "단백질",
        },
        {
          name: "우유",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "냉장",
          group: "유제품",
        },
        {
          name: "치즈",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "냉장",
          group: "유제품",
        },
        {
          name: "연어",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "냉동",
          group: "해산물",
        },
        {
          name: "새우",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "냉동",
          group: "해산물",
        },
        {
          name: "오징어",
          expirationDate: getRandomExpirationDate(3, 5),
          storageMethod: "냉동",
          group: "해산물",
        },
      ];
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
