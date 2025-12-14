import useUserHealthInfo from "../../../hooks/useUserHealthInfo.jsx";
import HealthInfoForm from "./HealthInfoForm.jsx";
import { useUserContext } from "../../../context/UserProvider.jsx";
import { useEffect, useState } from "react";

const HealthInfoView = ({ onComplete = () => {} }) => {
  const { healthInfoController } = useUserContext();

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="flex min-w-[300px] p-1">
      <HealthInfoForm
        healthInfoController={healthInfoController}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default HealthInfoView;
