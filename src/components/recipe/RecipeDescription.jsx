import PropTypes from "prop-types";

const style = {
  container: "flex flex-col justify-start bg-white py-6 px-4 text-left",
  title: "text-black text-2xl font-bold mx-3 mb-4",
  descriptionContainer:
    "flex flex-col justify-start bg-gray-200 rounded-lg py-5 px-12 h-32 overflow-hidden",
  description: "text-gray-800 text-sm leading-normal font-light",
};

const RecipeDescription = ({ name, description }) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>{name}</h1>
      <div className={style.descriptionContainer}>
        <p className={style.description}>{description}</p>
      </div>
    </div>
  );
};

RecipeDescription.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default RecipeDescription;
