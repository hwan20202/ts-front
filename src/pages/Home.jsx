import React, { useState, useEffect } from "react";
import IngredientDashboard from "../components/ingredient/IngredientDashboard.jsx";
import { useUserContext } from "../context/UserProvider.jsx";
import IngredientRegisterModal from "../components/ingredient/IngredientRegisterModal.jsx";
import SearchBar from "../components/common/SearchBar.jsx";
import RecipeGallery from "../components/RecipeGallary.jsx";
import useRecipeList from "../hooks/useRecipeList.jsx";
import { recipePath } from "../services/fetchRecipe.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
const styles = {
  container: "flex flex-col justify-center items-center overflow-y-auto pb-10",
  wrapperContainer: "container mx-auto px-2 py-4 bg-white mb-4",
  headerBase: "flex justify-between items-center my-4",
  headerTitle: "text-md font-bold text-black",
  headerButton:
    "text-sm font-bold text-green-300 border border-green-300 px-3 py-1 rounded-md hover:bg-green-300 hover:text-white",
  modal: {
    selectedIngredientsList: {
      container:
        "flex border p-4 mt-2 rounded-md bg-gray-100 h-full flex flex-col justify-between",
      noDataText: "text-gray-500",
    },
  },
};

const Section = ({ title, children, buttonLabel, onButtonClick }) => (
  <div className={styles.wrapperContainer}>
    <div className={styles.headerBase}>
      <span className={styles.headerTitle}>{title}</span>
      {buttonLabel && (
        <button className={styles.headerButton} onClick={onButtonClick}>
          {buttonLabel}
        </button>
      )}
    </div>
    {children}
  </div>
);

const Home = () => {
  const { ingredients, addIngredient, isSetPreferences } = useUserContext();
  const {
    recipes: recommendedRecipes,
    loading: recommendedRecipesLoading,
    loadMore: loadMoreRecommendedRecipes,
    error: recommendedRecipesError,
  } = useRecipeList({
    path: recipePath.recommended,
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    navigate("/login");
  }

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = (ingredients) => {
    ingredients.forEach((ingredient) => {
      addIngredient(ingredient);
    });

    closeModal();
  };

  return (
    <div className={styles.container}>
      <Section title="오늘 뭐 먹지">
        <SearchBar label="검색" onSearch={() => {}} />
        <RecipeGallery
          recipes={recommendedRecipes}
          loadRecipes={loadMoreRecommendedRecipes}
          loading={recommendedRecipesLoading}
          error={recommendedRecipesError}
        />
      </Section>

      <Section
        title="대시보드"
        buttonLabel="재료 등록"
        onButtonClick={openModal}
      >
        <IngredientDashboard ingredientsList={ingredients} />
      </Section>

      {/* 모달 */}
      {isOpen && (
        <IngredientRegisterModal
          onClose={closeModal}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Home;
