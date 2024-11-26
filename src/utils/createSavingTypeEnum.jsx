export const createSavingTypeEnum = () => {
  const enumData = {
    ROOM_TEMPERATURE: "실온",
    REFRIGERATED: "냉장",
    FROZEN: "냉동",
  };

  return {
    // 모든 키 반환
    keys() {
      return Object.keys(enumData);
    },

    // 모든 값 반환
    values() {
      return Object.values(enumData);
    },

    getValue(key) {
      return enumData[key];
    },

    // 값으로 키 찾기
    getKeyByValue(value) {
      return Object.keys(enumData).find((key) => enumData[key] === value);
    },

    // 기본 키 반환
    defaultKey() {
      return this.getKeyByValue(enumData.ROOM_TEMPERATURE);
    },
  };
};
