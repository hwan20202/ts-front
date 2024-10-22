import React from "react";
import Button from "../components/Button.jsx";

const MealDoneButton = () => {

    const mealDone = () => {
        console.log('complete meal!');
    }

    return (
        <Button label='식사완료' onClick={mealDone} size='lg' />
    );
}

export default MealDoneButton;