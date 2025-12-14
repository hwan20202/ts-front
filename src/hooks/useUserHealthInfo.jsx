import { useState } from "react";
import { HealthInfoService } from "../services/HealthInfoService";

const useUserHealthInfo = () => {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedHeight, setSelectedHeight] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(null);
  const activityLevels = ["비활동적", "저활동적", "활동적", "매우 활동적"];

  const healthInfoController = {
    selectedAge,
    selectedHeight,
    selectedWeight,
    selectedGender,
    selectedActivityLevel,
    setAge: setSelectedAge,
    setHeight: setSelectedHeight,
    setWeight: setSelectedWeight,
    setGender: setSelectedGender,
    setActivityLevel: setSelectedActivityLevel,
    complete: async () => {
      const healthInfoResult = await HealthInfoService.putUserHealthInfo({
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
