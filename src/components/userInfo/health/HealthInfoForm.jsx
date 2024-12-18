import { useInitialUserInfoContext } from "../../../context/InitialUserInfoProvider";
import { useNavigate } from "react-router-dom";

const style = {
  select:
    "leading-none p-2  bg-orange-300 text-center font-bold text-white text-sm focus:outline-none",
  input:
    "leading-none p-2 bg-orange-300 text-center font-bold text-white text-sm focus:outline-none",
  label:
    "w-full text-center text-gray-500 font-bold h-full flex items-center justify-center",
  button: "bg-orange-500 w-full h-10 text-white leading-none rounded-lg",
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
  const navigate = useNavigate();

  const handleNext = () => {
    healthInfoController.complete();
    onComplete();
  };

  return (
    <div className="w-full max-w-[320px] h-screen flex flex-col gap-4 items-center justify-center text-black">
      <Section>
        <label className={style.label} htmlFor="age">
          생년월일
        </label>
        <select
          required
          className={style.select}
          id="age"
          defaultValue={healthInfoController.getAge()}
          onChange={(e) => {
            healthInfoController.setAge(e.target.value);
          }}
        >
          {Array.from({ length: 2024 - 1930 + 1 }, (_, i) => (
            <option value={1930 + i}>{1930 + i}</option>
          ))}
        </select>
      </Section>
      {/* <Section>
        <label className={style.label} htmlFor="gender">
          성별
        </label>
        <select
          required
          className={style.select}
          id="gender"
          defaultValue={healthInfoController.getGender()}
          onChange={(e) => {
            healthInfoController.setGender(e.target.value);
          }}
        >
          <option value="male">남</option>
          <option value="female">여</option>
        </select>
      </Section> */}
      <Section>
        <label className={style.label} htmlFor="height">
          키
        </label>
        <select
          required
          className={style.select}
          id="height"
          defaultValue={healthInfoController.getHeight()}
          onChange={(e) => {
            healthInfoController.setHeight(e.target.value);
          }}
        >
          {Array.from({ length: 200 - 120 + 1 }, (_, i) => (
            <option value={120 + i}>{120 + i}</option>
          ))}
        </select>
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
          defaultValue={healthInfoController.getWeight()}
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
          defaultValue={healthInfoController.getActivityLevel()}
          onChange={(e) => {
            healthInfoController.setActivityLevel(e.target.value);
          }}
        >
          {activityLevels.map((level) => (
            <option value={level}>{level}</option>
          ))}
        </select>
      </Section>
      <button className={style.button} onClick={handleNext}>
        다음
      </button>
    </div>
  );
};

export default HealthInfoForm;
