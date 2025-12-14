import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import IconButton from "../common/IconButton.jsx";
const styles = {
  icon: "text-gray-500 text-sm p-1",
};

const RecipeEditHeader = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Header>
      <div className="flex w-full justify-start items-center">
        <div className="flex items-center">
          <IconButton
            icon={<i className="fa-solid fa-arrow-left text-black"></i>}
            onClick={goBack}
            label="뒤로가기"
            className="text-lg text-gray-600 hover:text-gray-800 grow grow-hover bg-gray-100"
          />
        </div>
      </div>
    </Header>
  );
};

export default RecipeEditHeader;
