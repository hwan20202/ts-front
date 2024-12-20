import { useState } from "react";
import { putUserHealthInfo } from "../services/fetchUserInfo";

const useUserHealthInfo = ({ age, height, weight, activityLevel }) => {
  const [selectedAge, setSelectedAge] = useState(age || 20);
  const [selectedHeight, setSelectedHeight] = useState(height || 160);
  const [selectedWeight, setSelectedWeight] = useState(weight || 60);
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    activityLevel || "저활동적"
  );
  const activityLevels = ["비활동적", "저활동적", "활동적", "매우 활동적"];

  const healthInfoController = {
    getAge: () => selectedAge,
    getHeight: () => selectedHeight,
    getWeight: () => selectedWeight,
    getGender: () => selectedGender,
    getActivityLevel: () => selectedActivityLevel,
    setAge: setSelectedAge,
    setHeight: setSelectedHeight,
    setWeight: setSelectedWeight,
    setGender: setSelectedGender,
    setActivityLevel: setSelectedActivityLevel,
    complete: async () => {
      const healthInfoResult = await putUserHealthInfo({
        age: selectedAge,
        height: selectedHeight,
        gender: selectedGender,
        weight: selectedWeight,
        activity_level: selectedActivityLevel,
      });
      if (!healthInfoResult) {
        throw new Error("건강 정보 설정 실패");
      }
      return true;
    },
    activityLevelsEnum: () => activityLevels,
  };

  return { healthInfoController };
};

export default useUserHealthInfo;
