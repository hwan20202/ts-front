import PropTypes from "prop-types";
import renderElement from "../../utils/renderElement";

const styles = {
  container: "TitleContentContainer",
};

const TitleContentContainer = ({ title, content, className }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {title && renderElement(title)}
      {content && renderElement(content)}
    </div>
  );
};

TitleContentContainer.propTypes = {
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
    .isRequired,
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
    .isRequired,
  className: PropTypes.string,
};

export default TitleContentContainer;
