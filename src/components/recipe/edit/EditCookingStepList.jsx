import React, { useRef } from "react";
import PropTypes from "prop-types";

const styles = {
  container: "flex flex-col bg-white p-6 min-h-[200px] text-black",
  title: "text-left text-xl font-bold text-black p-0 mb-4",
  step: {
    container:
      "flex flex-col justify-center items-start gap-2 mb-4 bg-gray-100 p-4 rounded-lg font-semibold",
    stepNumber: "text-md text-gray-400 leading-none font-sans font-semibold",
    // content: "text-lg text-gray-500 leading-[2] font-sans font-semibold",
    textarea:
      "w-full text-gray-500 bg-gray-300 text-sm leading-[2] h-12 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-green-500 shadow-md",
  },
};

const EditCookingStepItem = ({
  order,
  index,
  onImgChange = () => {},
  onChange = () => {},
}) => {
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles.step.container} key={index}>
      <div className={styles.step.stepNumber}>{`${index + 1} 단계`}</div>
      <div
        className="w-full h-24 flex justify-center items-center border-2 border-gray-300 rounded-md"
        onClick={handleFileInputClick}
      >
        <i className="fa-solid fa-circle-plus"></i>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={(e) => onImgChange({ index, img: e.target.files[0] })}
        />
      </div>
      <textarea
        type="text"
        defaultValue={order}
        onChange={(e) => onChange({ index, order: e.target.value })}
        className={styles.step.textarea}
      />
    </div>
  );
};

const EditCookingStepList = ({
  cookingOrder,
  cookingImg,
  editCookingImg,
  editCookingOrder,
}) => {
  // add orders

  // delete orders

  const handleImgChange = (index, img) => {
    editCookingImg({ index, img });
  };

  const handleOrderChange = (index, value) => {
    editCookingOrder({ index, order: value });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>조리 순서</h2>
      {cookingOrder && cookingOrder.length > 0
        ? cookingOrder.map((order, index) => (
            <EditCookingStepItem
              order={order}
              img={cookingImg[index]}
              key={index}
              onChange={handleOrderChange}
              onImgChange={handleImgChange}
            />
          ))
        : "조리 순서 없음"}
    </div>
  );
};

EditCookingStepList.propTypes = {
  cookingOrder: PropTypes.array.isRequired,
  cookingImg: PropTypes.array.isRequired,
  editCookingOrder: PropTypes.func.isRequired,
  editCookingImg: PropTypes.func.isRequired,
};

export default EditCookingStepList;
