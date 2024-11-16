import React from "react";
import Button from "../common/Button.jsx";
import PropTypes from "prop-types";
import { fetchMealDone } from "../../utils/fetchData.jsx";

const MealDoneButton = (className) => {
  const classList = `
    ${className}
    `;

  const mealDone = async () => {
    const response = await fetchMealDone(true);
    console.log(response);
  };

  return (
    <Button
      label="식사완료"
      onClick={mealDone}
      size="lg"
      className={classList}
    />
  );
};

MealDoneButton.propTypes = {
  className: PropTypes.string,
};

export default MealDoneButton;
