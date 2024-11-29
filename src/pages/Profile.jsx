import { useUserContext } from "../context/UserProvider.jsx";
import RecipeGallary from "../components/RecipeGallary.jsx";
import useRecipeList from "../hooks/useRecipeList.jsx";
import { recipePath } from "../services/fetchRecipe.jsx";
import Preference from "../components/Preference.jsx";

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

const Profile = () => {
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

  return (
    <div>
      <Section title="사용자 프로필">
        <div className="flex flex-col items-center text-black leading-none">
          <span>이름</span>
          <span>닉네임</span>
          <Preference />
        </div>
      </Section>

      <Section title="내 레시피">
        <RecipeGallary
          recipes={myRecipes}
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
