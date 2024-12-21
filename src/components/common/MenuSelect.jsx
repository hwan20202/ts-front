import { useState } from "react";

const MenuSelect = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="flex bg-white rounded-t-xl overflow-hidden mt-4">
      {options.map((option, index) => (
        <button
          key={index}
          className={`w-full px-4 py-2 transition-all duration-300 ${
            selectedOption === option
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-500 border-b-2 border-gray-300"
          }`}
          onClick={() => {
            setSelectedOption(option);
            onChange(options.indexOf(option));
          }}
        >
          <span className="font-bold text-lg">{option}</span>
        </button>
      ))}
    </div>
  );
};

export default MenuSelect;
