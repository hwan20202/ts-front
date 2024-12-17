import useUserHealthInfo from "../../../hooks/useUserHealthInfo.jsx";
import HealthInfoForm from "./HealthInfoForm.jsx";

const HealthInfoView = () => {
  //   const { age, height, weight, activityLevel } = useUserHealthInfo();
  const { healthInfoController } = useUserHealthInfo({
    age: 20,
    height: 170,
    weight: 60,
    activityLevel: "active",
  });
  return (
    <div className="flex min-w-[300px] p-1">
      <HealthInfoForm healthInfoController={healthInfoController} />
    </div>
  );
};

export default HealthInfoView;
