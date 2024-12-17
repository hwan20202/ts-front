import { useNavigate } from "react-router-dom";
import { useInitialUserInfoContext } from "../../../context/InitialUserInfoProvider";
import HealthInfoForm from "./HealthInfoForm.jsx";

const HealthInfoInit = () => {
  const { healthInfoController } = useInitialUserInfoContext();
  const navigate = useNavigate();
  const handleComplete = () => {
    alert("건강 정보 설정 완료");
    navigate("/");
  };
  return (
    <HealthInfoForm
      healthInfoController={healthInfoController}
      onComplete={handleComplete}
    />
  );
};

export default HealthInfoInit;
