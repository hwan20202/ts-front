import React, { useState, useEffect } from "react";
import Button from "./common/Button";
import Dropdown from "./common/Dropdown";
import Ingredient from "../utils/Ingredient";
import PropTypes from "prop-types";
const buttonStyle =
  "px-2 whitespace-nowrap rounded-none leading-[0] text-sm cursor-pointer";

const IngredientEditBox = ({ ingredient, onSave }) => {
  const [selectedButton, setSelectedButton] = useState(
    ingredient ? ingredient.savingType : "냉장"
  );
  const [selectedDays, setSelectedDays] = useState(
    ingredient ? ingredient.getDaysUntilExpiration() : 0
  );

  useEffect(() => {
    handleSave();
  }, [selectedButton, selectedDays]);

  const handleSave = () => {
    if (!ingredient) return;
    const updatedIngredient = new Ingredient({
      id: ingredient.id,
      name: ingredient.name,
      expirationDate: new Date(
        new Date().setDate(new Date().getDate() + selectedDays)
      ).toISOString(),
      savingType: selectedButton,
      group: ingredient.group,
    });
    onSave(updatedIngredient);
  };

  return (
    <div className="flex" onClick={(e) => e.stopPropagation()}>
      <div className="flex rounded-full overflow-hidden h-8 border-2 border-white">
        {["실온", "냉장", "냉동"].map((item) => (
          <Button
            key={item}
            label={item}
            onClick={() => setSelectedButton(item)}
            className={`${buttonStyle} ${
              selectedButton === item ? "bg-green-500" : "bg-gray-100"
            }`}
          />
        ))}
      </div>
      <Dropdown
        list={[1, 3, 7, 14, 30, 60, 90]}
        setSelected={(value) => setSelectedDays(value)}
        selected={selectedDays}
      />
    </div>
  );
};

IngredientEditBox.propTypes = {
  ingredient: PropTypes.instanceOf(Ingredient).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default IngredientEditBox;
