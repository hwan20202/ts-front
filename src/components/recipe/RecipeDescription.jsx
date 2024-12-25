import PropTypes from "prop-types";

const style = {
  container: "flex flex-col justify-start bg-white py-6 px-4 text-left",
  title: "text-black text-2xl font-bold mx-3 mb-1",
  subtitle: "text-gray-400 text-xs font-light p-0 mx-3 mb-4 font-semibold",
  descriptionContainer:
    "grid grid-cols-3 bg-gray-200 rounded-lg py-4 text-black",
  description: "flex flex-col items-center text-lg font-semibold text-gray-600",
  border: "border-l border-r border-gray-300",
};

const RecipeDescription = ({
  title,
  hashtag = [],
  recipe_type = [],
  method_key,
  servings,
  cooking_time,
  difficulty,
}) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>{title}</h1>
      <h2 className={style.subtitle}>
        {hashtag && hashtag.length > 0 ? hashtag.join(", ") : ""} |{" "}
        {recipe_type && recipe_type.length > 0 ? recipe_type.join(", ") : ""} |{" "}
        {method_key}
      </h2>
      <div className={style.descriptionContainer}>
        <div className={style.description}>
          <span className="text-base">인원</span>
          <span>{servings}</span>
        </div>
        <div className={style.description + " " + style.border}>
          <span className="text-base">조리시간</span>
          <span>{cooking_time || "-"}</span>
        </div>
        <div className={style.description}>
          <span className="text-base">난이도</span>
          <span>{difficulty || "-"}</span>
        </div>
      </div>
    </div>
  );
};

RecipeDescription.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipeDescription;
