import React from "react";
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

const EditCookingStepList = ({ orders, onChange = () => {} }) => {
  // add orders

  // delete orders

  const handleOrderChange = (index, value) => {
    console.log(`handleOrderChange: ${index} ${value}`);
    onChange(index, value);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>조리 순서</h2>
      {orders && orders.length > 0
        ? orders.map((order, index) => (
            <div className={styles.step.container} key={index}>
              <div className={styles.step.stepNumber}>{`${
                index + 1
              } 단계`}</div>
              {/* <div className={styles.step.content}>{order}</div> */}
              <textarea
                type="text"
                defaultValue={order}
                onChange={(e) => handleOrderChange(index, e.target.value)}
                className={styles.step.textarea}
              />
            </div>
          ))
        : "조리 순서 없음"}
    </div>
  );
};

EditCookingStepList.propTypes = {
  orders: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default EditCookingStepList;
