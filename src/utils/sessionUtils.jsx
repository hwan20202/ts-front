export const saveDataToSession = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

// 데이터 불러오기
export const loadDataFromSession = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// 데이터 삭제
export const removeDataFromSession = (key) => {
  sessionStorage.removeItem(key);
};
