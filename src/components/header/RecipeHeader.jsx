import Header from "./Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider.jsx";
import { useEffect, useState } from "react";
import { getIsBookmarked } from "../../services/fetchRecipe.jsx";

const styles = {
  icon: "text-gray-500 text-sm p-1",
};

const RecipeHeader = () => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { recipeId } = useParams();
  const { addBookmarkedRecipe } = useUserContext();

  useEffect(() => {
    const fetchGetIsBookmarked = async () => {
      const data = await getIsBookmarked(recipeId);
      if (data) {
        console.log(data);
        setIsBookmarked(data);
      }
    };
    // fetchGetIsBookmarked();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const share = () => {
    console.log("share");
  };

  const bookmark = () => {
    console.log("bookmark");
    addBookmarkedRecipe(recipeId);
  };

  const edit = () => {
    console.log("edit");
    navigate(`/recipe/${recipeId}/edit`);
  };

  return (
    <Header
      first={
        <i
          className={`fa-solid fa-arrow-left ${styles.icon}`}
          onClick={goBack}
        ></i>
      }
      third={
        <div>
          {/* 공유, 저장, 편집 */}
          <i
            className={`fa-solid fa-share-nodes ${styles.icon}`}
            onClick={share}
          ></i>
          <i
            className={`${
              isBookmarked ? "fa-solid" : "fa-regular"
            } fa-bookmark ${styles.icon}`}
            onClick={bookmark}
          ></i>
          <i
            className={`fa-solid fa-pen-to-square ${styles.icon}`}
            onClick={edit}
          ></i>
        </div>
      }
    />
  );
};

export default RecipeHeader;
