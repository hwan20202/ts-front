import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";
import IconButton from "../common/IconButton.jsx";
const styles = {
  icon: "text-gray-500 text-sm p-1",
};

const RecipeEditHeader = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Header>
      <div className="flex w-full justify-start items-center">
        <IconButton
          icon={<i className="fa-solid fa-arrow-left text-black"></i>}
          onClick={goBack}
          label="뒤로가기"
        />
      </div>
    </Header>
  );
};

export default RecipeEditHeader;
