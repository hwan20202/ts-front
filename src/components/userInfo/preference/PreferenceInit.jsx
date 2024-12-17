import { useInitialUserInfoContext } from "../../../context/InitialUserInfoProvider";
import OptionSelector from "../OptionSelector";
import SelectSection from "../InitSection";
import ToggleButton from "../../common/ToggleButton";
import { useNavigate } from "react-router-dom";
import { getFakePreferencesTags } from "../../../services/fetchUserInfo";

const styles = {
  input: "w-full bg-white outline-none text-gray-500",
  selectedButton: "leading-none p-2 rounded-lg bg-orange-500",
  button: "bg-orange-500 w-full h-10 text-white leading-none rounded-lg",
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
      options: getValues("methodKey"),
      selectedOptions: preferenceController.getSelectedMethodKey(),
      setSelectedOptions: preferenceController.setSelectedMethodKey,
    },
    step2: {
      title: "레시피 유형",
      options: getValues("recipeType"),
      selectedOptions: preferenceController.getSelectedRecipeType(),
      setSelectedOptions: preferenceController.setSelectedRecipeType,
    },
    step3: {
      title: "스타일",
      options: getValues("style"),
      selectedOptions: preferenceController.getSelectedStyle(),
      setSelectedOptions: preferenceController.setSelectedStyle,
    },
    step4: {
      title: "맛",
      options: getValues("flavor"),
      selectedOptions: preferenceController.getSelectedFlavor(),
      setSelectedOptions: preferenceController.setSelectedFlavor,
    },
    step5: {
      title: "영양",
      options: getValues("nutrition"),
      selectedOptions: preferenceController.getSelectedNutrition(),
      setSelectedOptions: preferenceController.setSelectedNutrition,
    },
    step6: {
      title: "건강 목표",
      options: getValues("healthObjective"),
      selectedOptions: preferenceController.getSelectedHealthObjective(),
      setSelectedOptions: preferenceController.setSelectedHealthObjective,
    },
  };

  return (
    <div>
      <SelectSection title="조리법">
        <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <h2 className={styles.title}>알레르기</h2>
          <ButtonBox
            items={allergyController.getAllergies()}
            setItems={allergyController.setAllergies}
          />
          <form
            className="gap-4 w-full justify-center items-center bg-white p-2 rounded-lg"
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
              className={`${styles.input} ${styles.focusInput}`}
              placeholder="알레르기 추가"
            />
          </form>
        </div>
      </SelectSection>
      {Object.values(preferenceConfig).map((config) => (
        <SelectSection title={config.title} key={config.title}>
          <OptionSelector
            options={config.options}
            selectedOptions={config.selectedOptions}
            setSelectedOptions={config.setSelectedOptions}
          />
        </SelectSection>
      ))}
      <button className={styles.button} onClick={handleNext}>
        다음
      </button>
    </div>
  );
};

export default PreferenceInit;
