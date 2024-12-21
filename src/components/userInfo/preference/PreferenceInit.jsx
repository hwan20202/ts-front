import { useInitialUserInfoContext } from "../../../context/InitialUserInfoProvider";
import OptionSelector from "../OptionSelector";
import SelectSection from "../InitSection";
import ToggleButton from "../../common/ToggleButton";
import { useNavigate } from "react-router-dom";
import { getFakePreferencesTags } from "../../../services/fetchUserInfo";
import InputSection from "../InputSection";
const styles = {
  input: "w-full bg-white outline-none text-gray-500",
  selectedButton: "leading-none p-2 rounded-lg bg-orange-500 font-bold",
  button: "bg-orange-500 w-full h-10 text-white leading-none rounded-lg",
  inputSection: {
    form: "w-full p-2 bg-gray-100 rounded-sm",
    input: "w-full bg-gray-100 outline-none text-gray-500",
    focusInput: "focus:border-b-[0.5px] focus:border-b-green-500",
    button:
      "outline-none text-white border-gray-300 border p-2 rounded-sm text-sm whitespace-nowrap bg-green-300",
    buttonFocus:
      "hover:bg-green-400 focus:border focus:border-green-300 focus:bg-green-400 focus:text-white focus:font-bold",
  },
};

const ButtonBox = ({ items, setItems }) => {
  if (!items || items.length === 0) return null;

  const handleClick = (item) => {
    setItems(items.filter((i) => i !== item));
  };

  return (
    <div className="flex flex-wrap gap-2 items-center min-h-[50px] max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {items.map((item) => (
        <ToggleButton
          key={item}
          onSetTrue={() => handleClick(item)}
          onSetFalse={() => {}}
          // trueClassName={styles.selectedButton}
          falseClassName={styles.selectedButton}
        >
          {item}
        </ToggleButton>
      ))}
    </div>
  );
};

const PreferenceInit = () => {
  const { preferenceController, allergyController } =
    useInitialUserInfoContext();
  const { getValues } = getFakePreferencesTags();
  const navigate = useNavigate();

  const handleNext = () => {
    preferenceController.complete();
    allergyController.complete();
    navigate("/");
  };

  const preferenceConfig = {
    step1: {
      title: "조리법",
      description: "선호하는 조리법을 선택해주세요.",
      options: getValues("methodKey"),
      selectedOptions: preferenceController.getSelectedMethodKey(),
      setSelectedOptions: preferenceController.setSelectedMethodKey,
    },
    step2: {
      title: "레시피 유형",
      description: "주로 어떤 목적으로 레시피를 찾으시는지 선택해주세요.",
      options: getValues("recipeType"),
      selectedOptions: preferenceController.getSelectedRecipeType(),
      setSelectedOptions: preferenceController.setSelectedRecipeType,
    },
    step3: {
      title: "스타일",
      description: "선호하는 스타일을 선택해주세요.",
      options: getValues("style"),
      selectedOptions: preferenceController.getSelectedStyle(),
      setSelectedOptions: preferenceController.setSelectedStyle,
    },
    step4: {
      title: "맛",
      description: "선호하는 맛을 선택해주세요.",
      options: getValues("flavor"),
      selectedOptions: preferenceController.getSelectedFlavor(),
      setSelectedOptions: preferenceController.setSelectedFlavor,
    },
    step5: {
      title: "영양",
      description: "고려하고 싶은 영양소를 선택해주세요.",
      options: getValues("nutrition"),
      selectedOptions: preferenceController.getSelectedNutrition(),
      setSelectedOptions: preferenceController.setSelectedNutrition,
    },
    step6: {
      title: "건강 목표",
      description: "건강 목표를 선택해주세요.",
      options: getValues("healthObjective"),
      selectedOptions: preferenceController.getSelectedHealthObjective(),
      setSelectedOptions: preferenceController.setSelectedHealthObjective,
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-black text-center">
        선호 정보 설정
      </h1>
      <h6 className="text-gray-500 text-center whitespace-pre-line leading-none">
        선호 정보를 설정하면 추천 레시피를 더 정확하게 추천해드립니다.
      </h6>
      {Object.values(preferenceConfig).map((config) => (
        <SelectSection
          title={config.title}
          description={config.description}
          key={config.title}
        >
          <OptionSelector
            options={config.options}
            selectedOptions={config.selectedOptions}
            setSelectedOptions={config.setSelectedOptions}
          />
        </SelectSection>
      ))}
      <h2 className="text-2xl font-bold text-black text-center">추가 정보</h2>
      <h6 className="text-gray-500 text-center whitespace-pre-line leading-none">
        알레르기 정보를 추가하면 레시피 변환 시에 알레르기 정보를 고려해
        추천해드립니다.
      </h6>
      <SelectSection title="알레르기">
        <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <ButtonBox
            items={allergyController.getAllergies()}
            setItems={allergyController.setAllergies}
          />
          <form
            className={`${styles.inputSection.form} flex gap-2`}
            onSubmit={(e) => {
              e.preventDefault();
              const newAllergies = e.target.allergies.value
                .replace(/,/g, " ")
                .split(" ")
                .filter((ingredient) => ingredient.trim() !== "");
              if (newAllergies) {
                allergyController.setAllergies([
                  ...allergyController.getAllergies(),
                  ...newAllergies,
                ]);
              }
              e.target.allergies.value = "";
            }}
          >
            <input
              name="allergies"
              className={`${styles.inputSection.input} ${styles.inputSection.focusInput}`}
              placeholder="알레르기 추가"
              autoComplete="off"
            />
            <button
              className={`${styles.inputSection.button} ${styles.inputSection.buttonFocus}`}
            >
              추가
            </button>
          </form>
        </div>
      </SelectSection>

      <button className={styles.button} onClick={handleNext}>
        다음
      </button>
    </div>
  );
};

export default PreferenceInit;
