import Header from "./Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider.jsx";
import { useEffect, useState } from "react";
import { getIsBookmarked } from "../../services/fetchRecipe.jsx";
import { useRecipe } from "../../context/RecipeProvider.jsx";
import IconButton from "../common/IconButton.jsx";
const styles = {
  icon: "text-gray-500 text-sm p-1",
};

const RecipeHeader = () => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { recipeId } = useParams();
  const { addBookmarkedRecipe } = useUserContext();
  const { editByUser } = useRecipe();
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
    editByUser();
    navigate(`/recipe/${recipeId}/edit`);
  };

  return (
    <Header>
      <div className="flex w-full justify-between items-center text-black">
        <IconButton
          icon={<i className="fa-solid fa-arrow-left"></i>}
          onClick={goBack}
          label="뒤로가기"
        />
        <div className="flex justify-between items-center">
          {/* 공유, 저장, 편집 */}
          <IconButton
            icon={<i className="fa-solid fa-share-nodes"></i>}
            onClick={share}
            label="공유"
          />
          <IconButton
            icon={
              <i
                className={`${
                  isBookmarked ? "fa-solid" : "fa-regular"
                } fa-bookmark`}
              ></i>
            }
            onClick={bookmark}
            label="저장"
          />
          <IconButton
            icon={<i className="fa-solid fa-pen-to-square"></i>}
            onClick={edit}
            label="편집"
          />
        </div>
      </div>
    </Header>
  );
};

export default RecipeHeader;
