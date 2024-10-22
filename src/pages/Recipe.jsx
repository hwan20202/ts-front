import React from "react";
import RecipeHeader from "../services/RecipeHeader.jsx";
import IngredientList from "../services/IngredientList.jsx";
import CookingStepList from "../services/CookingStepList.jsx";
import MealDoneButton from "../services/MealDoneButton.jsx";

const Recipe = () => {
    return (
        <div className="recipe-page w-full">
            <RecipeHeader />
            <IngredientList />
            <CookingStepList />
            <MealDoneButton />
        </div>
    );
}

export default Recipe;