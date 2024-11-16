import { useState, useEffect } from "react";
import { fetchRecipe } from "../utils/fetchData.jsx";
import RecipeProfile from "../components/recipe/RecipeProfile";
import RecipeDescription from "../components/recipe/RecipeDescription";
import EditIngredientList from "../components/recipe/edit/EditIngredientList";
import EditCookingStepList from "../components/recipe/edit/EditCookingStepList";
import { useUserContext } from "../context/UserProvider";
const style = {
  page: "flex flex-col w-full h-full justify-start",
};

const RecipeEdit = () => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const { setEditingRecipe } = useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipe = await fetchRecipe();
        setRecipe(recipe);
        setEditingRecipe(recipe);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOrderChange = (index, value) => {
    console.log(`handleOrderChange: ${index} ${value}`);
    // update orders
    recipe.cookingOrders[index] = value;
    setRecipe(recipe);
    console.log(recipe);
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  return (
    <div className={style.page}>
      <RecipeProfile image={recipe.profileImage} />
      <RecipeDescription
        image={recipe.profileImage}
        name={recipe.name}
        description={recipe.description}
      />
      <EditIngredientList ingredients={recipe.ingredients} className="mt-5" />
      <EditCookingStepList
        orders={recipe.cookingOrders}
        onChange={handleOrderChange}
      />
    </div>
  );
};

export default RecipeEdit;
