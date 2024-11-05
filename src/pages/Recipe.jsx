import React, {useEffect, useState} from "react";
import RecipeHeader from "../services/RecipeHeader.jsx";
import IngredientList from "../services/IngredientList.jsx";
import CookingStepList from "../services/CookingStepList.jsx";
import MealDoneButton from "../services/MealDoneButton.jsx";
import {fetchRecipe} from "../utils/fetchData.jsx";

const Recipe = () => {
    const [recipeName, setRecipeName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [cookingSteps, setCookingSteps] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            try {
                // 재료 가져오기
                const recipe = await fetchRecipe();
                setRecipeName(recipe.recipeName);
                setIngredients(recipe.ingredients);
                setCookingSteps(recipe.cookingSteps);

            } catch (e) {
                console.log(e.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="recipe-page w-full">
            <RecipeHeader recipeName={recipeName} />
            <IngredientList data={ingredients} />
            <CookingStepList data={cookingSteps} />
            <MealDoneButton />
        </div>
    );
}

export default Recipe;