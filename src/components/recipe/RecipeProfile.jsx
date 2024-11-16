import PropTypes from "prop-types";

const style = {
  container: "flex flex-col justify-start bg-white rounded-xl",
  image: "w-full h-full object-cover",
};

const RecipeProfile = ({ image }) => {
  return (
    <div className={style.container}>
      <img src={image} alt="recipe" className={style.image} />
    </div>
  );
};

RecipeProfile.propTypes = {
  image: PropTypes.string.isRequired,
};

export default RecipeProfile;
