import PropTypes from "prop-types";
import { useUserContext } from "../../context/UserProvider";
const styles = {
  container:
    "sticky flex justify-center p-2 bottom-0 left-0 w-full max-w-body h-12 bg-white gap-2 border-t border-gray-100",
  textContainer: "flex justify-center items-center p-1 mx-4",
  text: " text-sm text-gray-500 whitespace-nowrap font-sans",
  button:
    "text-sm font-bold w-full py-1 rounded-md text-white hover:bg-green-400 hover:text-white",
  buttonColorGreen: "bg-green-300 text-white hover:bg-green-400",
  buttonColorOrange: "bg-orange-300 text-white hover:bg-orange-400",
};

const RecipeFooter = ({ editMode = false }) => {
  const { updateEditingRecipe } = useUserContext();

  const handleCookComplete = () => {
    console.log("조리 완료");
  };

  const handleAITransform = () => {
    console.log("AI 변환");
  };

  const handleEditComplete = () => {
    console.log("편집 완료");
    updateEditingRecipe();
  };

  return (
    <div className={styles.container}>
      {!editMode && (
        <>
          <button
            className={`${styles.button} ${styles.buttonColorOrange}`}
            onClick={handleAITransform}
          >
            AI 변환
          </button>
          <button
            className={`${styles.button} ${styles.buttonColorGreen}`}
            onClick={handleCookComplete}
          >
            조리 완료
          </button>
        </>
      )}
      {editMode && (
        <>
          <button
            className={`${styles.button} ${styles.buttonColorOrange}`}
            onClick={handleAITransform}
          >
            AI 재변환
          </button>
          <button
            className={`${styles.button} ${styles.buttonColorGreen}`}
            onClick={handleEditComplete}
          >
            편집 완료
          </button>
        </>
      )}
    </div>
  );
};

RecipeFooter.propTypes = {
  editMode: PropTypes.bool,
};

export default RecipeFooter;
