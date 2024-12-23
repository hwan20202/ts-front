import useUserHealthInfo from "../../../hooks/useUserHealthInfo.jsx";
import HealthInfoForm from "./HealthInfoForm.jsx";
import { useUserContext } from "../../../context/UserProvider.jsx";
import { useEffect } from "react";

const HealthInfoView = () => {
  const { healthInfo } = useUserContext();
  const { healthInfoController } = useUserHealthInfo({ ...healthInfo });

  return (
    <div className="flex min-w-[300px] p-1">
      <HealthInfoForm healthInfoController={healthInfoController} />
    </div>
  );
};

export default HealthInfoView;
