import Header from "./Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider.jsx";
const styles = {
  icon: "text-gray-500 text-sm p-1",
};

const RecipeEditHeader = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Header
      first={
        <i
          className={`fa-solid fa-arrow-left ${styles.icon}`}
          onClick={goBack}
        ></i>
      }
    />
  );
};

export default RecipeEditHeader;
