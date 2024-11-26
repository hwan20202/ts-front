import React, { useState, useEffect } from "react";
import Dropdown from "./common/Dropdown";
import Ingredient from "../utils/Ingredient";
import PropTypes from "prop-types";
import { createSavingTypeEnum } from "../utils/createSavingTypeEnum";
const SavingTypeEnum = createSavingTypeEnum();

const styles = {
  container: "flex justify-between items-center gap-2",
  buttonContainer: "flex overflow-hidden shadow-sm",
  button:
    "text-gray-400 p-1 whitespace-nowrap outline-none rounded-none text-xs cursor-pointer",
  buttonFocus:
    "focus:bg-green-500 focus:text-white hover:bg-green-500 hover:text-white",
  buttonSelected: "bg-green-500 text-white",
  dropdown: "flex",
};

const IngredientEditBox = ({
  defaultSavingType,
  defaultDays,
  setSavingType,
  setDays,
}) => {
  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.buttonContainer}>
        {SavingTypeEnum.keys().map((item) => (
          <button
            key={item}
            onClick={() => setSavingType(item)}
            className={`${styles.button} ${styles.buttonFocus} ${
              defaultSavingType === item ? styles.buttonSelected : ""
            }`}
          >
            {SavingTypeEnum.getValue(item)}
          </button>
        ))}
      </div>
      <Dropdown
        list={[1, 3, 7, 14, 30, 60, 90, defaultDays].sort((a, b) => a - b)}
        setSelected={(value) => setDays(value)}
        selected={defaultDays}
        className={styles.dropdown}
      />
    </div>
  );
};

IngredientEditBox.propTypes = {
  defaultSavingType: PropTypes.string.isRequired,
  defaultDays: PropTypes.number.isRequired,
  setSavingType: PropTypes.func.isRequired,
  setDays: PropTypes.func.isRequired,
};

export default IngredientEditBox;
