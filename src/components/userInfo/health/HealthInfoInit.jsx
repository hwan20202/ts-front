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
    <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
      <h2 className="text-2xl font-bold text-black">건강 정보 설정</h2>
      <HealthInfoForm
        healthInfoController={healthInfoController}
        onComplete={handleComplete}
      />
      <button onClick={handleComplete}>완료</button>
    </div>
  );
};

export default HealthInfoInit;
