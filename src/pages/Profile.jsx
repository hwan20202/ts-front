import { useEffect, useState } from "react";
import RecipeGallary from "../components/RecipeGallary.jsx";
import useRecipeList from "../hooks/useRecipeList.jsx";
import { recipePath } from "../services/fetchRecipe.jsx";
import SideSheet from "../components/common/SideSheet.jsx";
import PreferenceView from "../components/userInfo/preference/PreferenceView.jsx";
import DislikedAndAllergyView from "../components/userInfo/dislikedAndAllergy/DislikedAndAllergyView.jsx";
import HealthInfoView from "../components/userInfo/health/HealthInfoView.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";

const styles = {
  container: "flex flex-col justify-center items-center h-screen",
  wrapperContainer: "container mx-auto px-2 py-4 bg-white mb-4",
  headerBase: "flex justify-between items-center my-4",
  headerTitle: "text-md font-bold text-black",
  headerButton:
    "text-sm font-bold text-green-300 border border-green-300 px-3 py-1 rounded-md hover:bg-green-300 hover:text-white",
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

const SettingSection = ({ title, description, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="w-full flex flex-col gap-2 shadow-sm hover:shadow-lg rounded-md cursor-pointer m-1 px-4 py-2"
      onClick={handleClick}
    >
      <div className="">
        <span className="text-md font-bold text-black">{title}</span>
      </div>
      <div className="">
        <span className="text-xs text-gray-400">{description}</span>
      </div>
      <SideSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </SideSheet>
    </div>
  );
};

const Profile = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const {
    recipes: bookmarkedRecipes,
    loading: bookmarkedLoading,
    error: bookmarkedError,
    loadMore: bookmarkedLoadMore,
  } = useRecipeList({
    path: recipePath.bookmarked,
  });

  const {
    recipes: eatenRecipes,
    loading: eatenLoading,
    error: eatenError,
    loadMore: eatenLoadMore,
  } = useRecipeList({
    path: recipePath.eaten,
  });

  const {
    recipes: myRecipes,
    loading: myLoading,
    error: myError,
    loadMore: myLoadMore,
  } = useRecipeList({
    path: recipePath.my,
  });

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="pt-10 bg-white">
      <Section title="사용자 프로필">
        <div className="flex flex-col items-center text-black leading-none">
          <SettingSection
            title="신체정보 설정"
            description="영양맞춤 레시피를 추천받기 위해 신체정보를 설정해주세요."
          >
            <HealthInfoView
              onComplete={() => setIsHealthInfoSheetOpen(false)}
            />
          </SettingSection>
          <SettingSection
            title="알러지 및 싫어하는 재료 설정"
            description="알러지 및 싫어하는 재료를 설정해주세요."
          >
            <DislikedAndAllergyView />
          </SettingSection>
          <SettingSection
            title="선호도 설정"
            description="선호도를 설정해주세요."
          >
            <PreferenceView />
          </SettingSection>
        </div>
      </Section>

      <Section title="내 레시피">
        <RecipeGallary
          recipes={myRecipes.map((recipe) => ({ ...recipe, tag: "custom" }))}
          loading={myLoading}
          error={myError}
          loadRecipes={myLoadMore}
        />
      </Section>

      <Section title="먹었어요">
        <RecipeGallary
          recipes={eatenRecipes}
          loading={eatenLoading}
          error={eatenError}
          loadRecipes={eatenLoadMore}
        />
      </Section>

      <Section title="먹고 싶어요">
        <RecipeGallary
          recipes={bookmarkedRecipes}
          loading={bookmarkedLoading}
          error={bookmarkedError}
          loadRecipes={bookmarkedLoadMore}
        />
      </Section>
    </div>
  );
};

export default Profile;
