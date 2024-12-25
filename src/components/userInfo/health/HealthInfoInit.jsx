import { useNavigate } from "react-router-dom";
import HealthInfoForm from "./HealthInfoForm.jsx";
import { useUserContext } from "../../../context/UserProvider";

const HealthInfoInit = () => {
  const { healthInfoController } = useUserContext();
  const navigate = useNavigate();
  const handleComplete = () => {
    alert("건강 정보 설정 완료");
    navigate("/");
  };
  return (
    <div className="w-full h-screen flex flex-col gap-10 items-center justify-center px-6">
      <h2 className="text-2xl font-bold text-black">건강 정보 설정</h2>
      <HealthInfoForm
        healthInfoController={healthInfoController}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default HealthInfoInit;
