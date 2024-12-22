import XScrollable from "./common/XScrollable";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Recipe from "../models/Recipe";
import ImageWithSkeleton from "./common/ImageWithSkeleton";
const Card = ({
  id,
  tag,
  main_img,
  title,
  hashtag,
  cooking_time,
  difficulty,
  cooking_order,
}) => {
  const styles2 = {
    card: "relative flex-shrink-0 bg-white rounded-lg text-center text-gray-500 w-48 h-48",
    cardHover: "hover:bg-gray-100",
    imgContainer: "w-full h-2/3 overflow-hidden rounded-lg",
    img: "w-full h-full object-cover object-center",
    info: "w-full h-1/3 mt-4",
    title: "p-0 text-left text-sm font-bold overflow-hidden whitespace-nowrap",
    description: "text-left text-xs",
  };

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/recipe/${tag}/${id}`);
  };

  return (
    <div className={`${styles2.card} ${styles2.cardHover}`} onClick={onClick}>
      <div className={styles2.imgContainer}>
        {/* <img src={main_img} alt={title} className={styles2.img} /> */}
        <ImageWithSkeleton src={main_img} alt={title} className={styles2.img} />
      </div>
      <div className={styles2.info}>
        <h2 className={styles2.title}>{title}</h2>
        <div className="absolute top-0 flex justify-center items-center bg-green-400 text-white font-bold rounded-lg p-1">
          <span className="text-xs">{cooking_time}</span>
          <div className="w-1 h-1 bg-white rounded-full mx-1"></div>
          <span className="text-xs">{difficulty}</span>
          <div className="w-1 h-1 bg-white rounded-full mx-1"></div>
          <span className="text-xs">{cooking_order.length}단계</span>
        </div>
        <p className={styles2.description}>{hashtag.join(", ")}</p>
      </div>
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="relative flex-shrink-0 rounded-lg text-center w-48 h-48">
      <div className="w-full h-2/3 overflow-hidden rounded-lg">
        <div className="w-full h-full animate-pulse"></div>
      </div>
      <div className="w-full h-1/3 mt-4">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="w-full h-4 animate-pulse"></div>
          <div className="w-3/4 h-4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const LoadMore = ({ loading, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className="w-48 h-48 bg-gray-200 flex justify-center items-center rounded-lg flex-shrink-0"
      onClick={handleClick}
    >
      <i
        className={`text-5xl fa-solid fa-rotate-left ${
          loading ? "fa-spin-reverse" : ""
        }`}
      ></i>
    </div>
  );
};

const RecipeGallary = ({ recipes, loadRecipes, loading, error }) => {
  return (
    <XScrollable onScrollEnd={() => {}}>
      <div className="flex gap-3 py-5">
        {recipes &&
          recipes.length > 0 &&
          recipes.map((recipe, index) => <Card key={index} {...recipe} />)}
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        <LoadMore loading={loading} onClick={loadRecipes} />
      </div>
    </XScrollable>
  );
};

RecipeGallary.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(Recipe)).isRequired, // Recipe type
  loadRecipes: PropTypes.func.isRequired,
};

export default RecipeGallary;
