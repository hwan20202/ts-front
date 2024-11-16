import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";

const styles = {
  icon: "text-gray-500 text-sm p-1",
};

const RecipeHeader = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const share = () => {
    console.log("share");
  };

  const bookmark = () => {
    console.log("bookmark");
  };

  const edit = () => {
    const recipeId = "123";
    console.log("edit");
    navigate(`/recipe/${recipeId}/edit`);
  };

  // first: 뒤로가기 버튼
  // third: 공유 버튼
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
            className={`fa-solid fa-bookmark ${styles.icon}`}
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
