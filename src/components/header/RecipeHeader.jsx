import Header from "./Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useRecipe } from "../../context/RecipeProvider.jsx";
import IconButton from "../common/IconButton.jsx";
// import logo from "../../assets/img/logo.jpg";
const styles = {
  icon: "text-gray-500 text-sm p-1",
};

const RecipeHeader = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const { modifyRecipe, share, bookmark, isBookmarked } = useRecipe();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const edit = async () => {
    const result = await modifyRecipe();
    navigate(`/recipe/user/${result.id}/edit`);
  };

  return (
    <Header>
      <div className="flex w-full justify-between items-center text-black">
        <div className="flex justify-between items-center gap-2">
          <IconButton
            icon={<i className="fa-solid fa-arrow-left"></i>}
            onClick={goBack}
            label="뒤로가기"
            className="text-lg text-gray-600 hover:text-gray-800 grow grow-hover bg-gray-100"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          {/* 공유, 저장, 편집 */}
          <IconButton
            icon={<i className="fa-solid fa-share"></i>}
            id="kakaotalk-sharing-btn"
            onClick={share}
            label="공유"
            className="text-lg text-gray-600 hover:text-gray-800 grow grow-hover bg-gray-100"
          />
          <IconButton
            icon={
              <i
                className={`${
                  isBookmarked ? "fa-solid text-yellow-300" : "fa-regular "
                } fa-bookmark`}
              ></i>
            }
            onClick={bookmark}
            label="저장"
            className="text-lg text-gray-600 hover:text-gray-800 grow grow-hover bg-gray-100"
          />
          <IconButton
            icon={<i className="fa-solid fa-pen"></i>}
            onClick={edit}
            label="편집"
            className="text-lg text-gray-600 hover:text-gray-800 grow grow-hover bg-gray-100"
          />
        </div>
      </div>
    </Header>
  );
};

export default RecipeHeader;
