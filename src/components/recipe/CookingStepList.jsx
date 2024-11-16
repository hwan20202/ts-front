import React from "react";
import PropTypes from "prop-types";

const styles = {
  container: "flex flex-col bg-white p-6 min-h-[200px] text-black",
  step: {
    container:
      "flex flex-col justify-center items-start gap-2 mb-4 bg-gray-100 p-4 rounded-lg",
    stepNumber: "text-md text-gray-400 leading-none font-sans font-semibold",
    content: "text-lg text-gray-500 leading-[2] font-sans font-semibold",
  },
};

const CookingStepList = ({ orders, className }) => {
  return (
    <div className={styles.container}>
      {orders && orders.length > 0
        ? orders.map((order, index) => (
            <div className={styles.step.container} key={index}>
              <div className={styles.step.stepNumber}>{`${
                index + 1
              } 단계`}</div>
              <div className={styles.step.content}>{order}</div>
            </div>
          ))
        : "조리 순서 없음"}
    </div>
  );
};

CookingStepList.propTypes = {
  orders: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default CookingStepList;
