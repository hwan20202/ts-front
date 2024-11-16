import React, { useEffect, useState } from "react";
import IngredientList from "../components/recipe/IngredientList.jsx";
import { fetchRecipe } from "../utils/fetchData.jsx";
import RecipeProfile from "../components/recipe/RecipeProfile.jsx";
import RecipeDescription from "../components/recipe/RecipeDescription.jsx";
import CookingStepList from "../components/recipe/CookingStepList.jsx";
const style = {
  page: "flex flex-col w-full h-full justify-start",
};

const RecipePage = () => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipe = await fetchRecipe();
        setRecipe(recipe);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  return (
    <div className={style.page}>
      <RecipeProfile image={recipe.profileImage} />
      {/* <RecipeHeader recipeName={recipe.name} /> */}
      <RecipeDescription
        image={recipe.profileImage}
        name={recipe.name}
        description={recipe.description}
      />
      <IngredientList ingredients={recipe.ingredients} className="mt-5" />
      <CookingStepList orders={recipe.cookingOrders} />
      {/* <MealDoneButton /> */}
    </div>
  );
};

export default RecipePage;
