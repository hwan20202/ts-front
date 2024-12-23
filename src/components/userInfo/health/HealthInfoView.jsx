import useUserHealthInfo from "../../../hooks/useUserHealthInfo.jsx";
import HealthInfoForm from "./HealthInfoForm.jsx";
import { HealthInfoService } from "../../../services/HealthInfoService.js";

const HealthInfoView = () => {
  const { gender, activity_level, height, weight } =
    HealthInfoService.getUserHealthInfo();
  const { healthInfoController } = useUserHealthInfo({
    age: 20,
    gender,
    activityLevel: activity_level,
    height,
    weight,
  });
  return (
    <div className="flex min-w-[300px] p-1">
      <HealthInfoForm healthInfoController={healthInfoController} />
    </div>
  );
};

export default HealthInfoView;
