import PropTypes from "prop-types";

const style = {
  container:
    "flex flex-col w-full h-[200px] overflow-hidden justify-center items-center bg-white",
  image: "object-cover object-center",
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
