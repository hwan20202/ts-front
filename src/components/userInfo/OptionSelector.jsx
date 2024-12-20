import SelectSection from "./InitSection";
import ToggleButton from "../common/ToggleButton";
const styles = {
  button: "px-4 py-2 rounded-lg",
  disabled: "opacity-50",
  normal: "bg-gray-300",
  orange: "bg-orange-500 text-white",
};

const OptionSelector = ({ options, selectedOptions, setSelectedOptions }) => {
  const handleSetTrue = (option) => {
    setSelectedOptions([...selectedOptions, option]);
  };

  const handleSetFalse = (option) => {
    setSelectedOptions(selectedOptions.filter((o) => o !== option));
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-[300px]">
      {options.map((option) => (
        <ToggleButton
          key={option}
          onSetTrue={() => handleSetTrue(option)}
          onSetFalse={() => handleSetFalse(option)}
          trueClassName={`${styles.button} ${styles.orange}`}
          falseClassName={`${styles.button} ${styles.normal}`}
        >
          {option}
        </ToggleButton>
      ))}
    </div>
  );
};

export default OptionSelector;
