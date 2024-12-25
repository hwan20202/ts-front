import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../../common/ToggleButton";
const style = {
  select:
    "leading-none p-2  bg-orange-300 text-center font-bold text-white text-sm focus:outline-none",
  input:
    "leading-none p-2 bg-gray-300 text-center font-bold text-white text-sm focus:outline-none border-b-2 focus:border-orange-500",
  label:
    "w-full text-center text-gray-500 font-bold h-full flex items-center justify-center",
  button: "w-full h-10 text-white leading-none transition-all duration-300",
  color: {
    gray: "bg-gray-400",
    orange: "bg-orange-500",
  },
  completeButton: {
    base: "w-full h-10 text-white leading-none transition-all duration-300 bg-orange-400 mt-4",
    hover: "hover:bg-orange-500",
  },
};

const Section = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-2 items-center justify-between gap-4">
      {children}
    </div>
  );
};

const HealthInfoForm = ({ healthInfoController, onComplete = () => {} }) => {
  const activityLevels = healthInfoController.activityLevelsEnum();
  const [gender, setGender] = useState(healthInfoController.selectedGender);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    healthInfoController.complete();
    onComplete();
  };

  useEffect(() => {
    healthInfoController.setGender(gender);
  }, [gender]);

  useEffect(() => {
    setGender(healthInfoController.selectedGender);
  }, [healthInfoController.selectedGender]);

  return (
    <form
      className="w-full max-w-[320px] h-screen flex flex-col gap-4 items-center justify-center text-black"
      onSubmit={handleNext}
    >
      <Section>
        <label className={style.label} htmlFor="age">
          나이
        </label>
        <input
          required
          className={style.input}
          type="number"
          id="age"
          min={1}
          max={100}
          placeholder="ㅡ"
          defaultValue={healthInfoController.selectedAge}
          onChange={(e) => {
            healthInfoController.setAge(e.target.value);
          }}
        />
      </Section>
      <Section>
        <label className={style.label} htmlFor="gender">
          성별
        </label>
        <div className="flex">
          <button
            type="button"
            className={
              style.button +
              " " +
              (gender === "MALE" ? style.color.orange : style.color.gray)
            }
            onClick={() =>
              gender === "MALE" ? setGender("FEMALE") : setGender("MALE")
            }
          >
            남
          </button>
          <button
            type="button"
            className={
              style.button +
              " " +
              (gender === "FEMALE" ? style.color.orange : style.color.gray)
            }
            onClick={() =>
              gender === "FEMALE" ? setGender("MALE") : setGender("FEMALE")
            }
          >
            여
          </button>
        </div>
      </Section>
      <Section>
        <label className={style.label} htmlFor="height">
          키
        </label>
        <input
          required
          className={style.input}
          type="number"
          id="height"
          placeholder="ㅡ"
          min={120}
          max={200}
          defaultValue={healthInfoController.selectedHeight}
          onChange={(e) => {
            healthInfoController.setHeight(e.target.value);
          }}
        />
      </Section>
      <Section>
        <label className={style.label} htmlFor="weight">
          몸무게
        </label>
        <input
          required
          className={style.input}
          min={40}
          max={180}
          type="number"
          id="weight"
          placeholder="ㅡ"
          defaultValue={healthInfoController.selectedWeight}
          onChange={(e) => {
            healthInfoController.setWeight(e.target.value);
          }}
        />
      </Section>

      <Section>
        <label className={style.label} htmlFor="activityLevel">
          활동 수준
        </label>
        <select
          required
          className={`${style.select}`}
          id="activityLevel"
          value={healthInfoController.selectedActivityLevel || ""}
          onChange={(e) => {
            healthInfoController.setActivityLevel(e.target.value);
          }}
        >
          <option value="">ㅡ</option>
          {activityLevels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
      </Section>
      <button
        className={style.completeButton.base + " " + style.completeButton.hover}
      >
        저장
      </button>
    </form>
  );
};

export default HealthInfoForm;
