import React, { useState, useEffect } from "react";
import Dropdown from "./common/Dropdown";
import Ingredient from "../models/Ingredient";
import PropTypes from "prop-types";
import { createSavingTypeEnum } from "../utils/createSavingTypeEnum";
const SavingTypeEnum = createSavingTypeEnum();

const styles = {
  container: "grid grid-cols-2 justify-between items-center gap-2",
  buttonContainer: "flex overflow-hidden shadow-sm",
  button:
    "text-gray-400 w-full p-1 whitespace-nowrap outline-none rounded-none text-xs cursor-pointer",
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
        options={[1, 3, 7, 14, 30, 60, 90]}
        defaultValue={defaultDays}
        onChange={(value) => setDays(value)}
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
