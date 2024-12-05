import Header from "./Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useRecipe } from "../../context/RecipeProvider.jsx";
import IconButton from "../common/IconButton.jsx";
const styles = {
  icon: "text-gray-500 text-sm p-1",
};

const RecipeHeader = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { editByUser, share, bookmark, isBookmarked } = useRecipe();

  const goBack = () => {
    navigate(-1);
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
            icon={
              <i
                id="kakaotalk-sharing-btn"
                className="fa-solid fa-share-nodes"
              ></i>
            }
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
