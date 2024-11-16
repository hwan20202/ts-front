import React from "react";
import MenuSearchForm from "../services/MenuSearchForm.jsx";
import DislikedIngredientsView from "../components/ingredient/DislikedIngredientsView.jsx";
import IngredientDashboard from "../components/ingredient/IngredientDashboard.jsx";
import { useUserContext } from "../context/UserProvider.jsx";

const style = {
  container: "flex flex-col justify-center items-center h-screen",
};

const Home = () => {
  const { ingredients } = useUserContext();

  return (
    <div className={style.container}>
      <MenuSearchForm />
      <IngredientDashboard ingredientsList={ingredients} />
      <DislikedIngredientsView />
    </div>
  );
};

export default Home;
