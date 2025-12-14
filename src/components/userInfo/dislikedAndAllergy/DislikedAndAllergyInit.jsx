import { useInitialUserInfoContext } from "../../../context/InitialUserInfoProvider.jsx";
import TagBox from "../TagBox";
import ToggleButton from "../../common/ToggleButton.jsx";
import { useNavigate } from "react-router-dom";

const styles = {
  container: "grid grid-rows-2 w-full h-full justify-center items-center",
  buttonStyle: "leading-none p-2 rounded-lg bg-orange-500",
  input: "w-full bg-white outline-none text-gray-500",
  focusInput: "focus:border-b-[0.5px] focus:border-b-green-500",
  title: "text-2xl font-bold text-black",
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
          handleSetTrue={() => handleClick(item)}
          handleSetFalse={() => {}}
          falseClassName={styles.buttonStyle}
        >
          {item}
        </ToggleButton>
      ))}
    </div>
  );
};

const Form = ({ placeholder, handleSubmit, name }) => {
  return (
    <form
      className="gap-4 w-full justify-center items-center bg-white p-2 rounded-lg"
      onSubmit={handleSubmit}
    >
      <input
        name={name}
        className={`${styles.input} ${styles.focusInput}`}
        placeholder={placeholder}
      />
    </form>
  );
};

const DislikedAndAllergyInit = () => {
  const { dislikedAndAllergyController } = useInitialUserInfoContext();
  const navigate = useNavigate();
  const {
    getDislikedIngredients,
    setDislikedIngredients,
    getAllergies,
    setAllergies,
    complete,
  } = dislikedAndAllergyController;

  const handleDislikedSubmit = (e) => {
    e.preventDefault();
    const newDislikedIngredients = e.target.dislikedIngredients.value
      .replace(/,/g, " ")
      .split(" ")
      .filter((ingredient) => ingredient.trim() !== "");
    if (newDislikedIngredients) {
      setDislikedIngredients([
        ...getDislikedIngredients(),
        ...newDislikedIngredients,
      ]);
    }
    e.target.dislikedIngredients.value = "";
  };

  const handleAllergySubmit = (e) => {
    e.preventDefault();
    const newAllergies = e.target.allergies.value.replace(/,/g, " ").split(" ");
    if (newAllergies) {
      setAllergies([...getAllergies(), ...newAllergies]);
    }
    e.target.allergies.value = "";
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className={styles.container}>
        <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <h2 className={styles.title}>싫어하는 재료</h2>
          <ButtonBox
            items={getDislikedIngredients()}
            setItems={setDislikedIngredients}
          />
          <Form
            name="dislikedIngredients"
            placeholder="싫어하는 재료 추가"
            handleSubmit={handleDislikedSubmit}
          />
        </div>

        <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
          <h2 className={styles.title}>알레르기</h2>
          <ButtonBox items={getAllergies()} setItems={setAllergies} />
          <Form
            name="allergies"
            placeholder="알레르기 추가"
            handleSubmit={handleAllergySubmit}
          />
        </div>
      </div>
      <button
        className="bg-orange-500 text-white p-2 rounded-lg"
        onClick={async () => {
          await complete();
          navigate("/");
        }}
      >
        다음
      </button>
    </div>
  );
};

export default DislikedAndAllergyInit;
