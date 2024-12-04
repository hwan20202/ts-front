import Gallary from "./common/Gallary";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Recipe from "../models/Recipe";

const Card = ({ id, tag, main_img, title, hashtag }) => {
  const styles2 = {
    card: "flex-shrink-0 bg-white rounded-lg text-center text-gray-500 w-48 h-48",
    cardHover: "hover:bg-gray-100",
    imgContainer: "w-full h-2/3 overflow-hidden rounded-lg",
    img: "w-full h-full object-cover object-center",
    info: "w-full h-1/3 mt-4",
    title: "p-0 text-left text-sm font-bold",
    description: "text-left text-xs",
  };

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/recipe/${tag}/${id}`);
  };

  return (
    <div className={`${styles2.card} ${styles2.cardHover}`} onClick={onClick}>
      <div className={styles2.imgContainer}>
        <img src={main_img} alt={title} className={styles2.img} />
      </div>
      <div className={styles2.info}>
        <h2 className={styles2.title}>{title}</h2>
        <p className={styles2.description}>{hashtag.join(", ")}</p>
      </div>
    </div>
  );
};

const RecipeGallary = ({ recipes, loadRecipes, loading, error }) => {
  return (
    <Gallary loadMore={loadRecipes} loading={loading} error={error}>
      {recipes &&
        recipes.length > 0 &&
        recipes.map((recipe, index) => <Card key={index} {...recipe} />)}
    </Gallary>
  );
};

RecipeGallary.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(Recipe)).isRequired, // Recipe type
  loadRecipes: PropTypes.func.isRequired,
};

export default RecipeGallary;
