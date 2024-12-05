import React from "react";
import PropTypes from "prop-types";

const styles = {
  container: "flex flex-col bg-white p-6 min-h-[200px] text-black",
  step: {
    container: "flex flex-col justify-center items-start gap-2 p-2 rounded-lg",
    stepNumber: "text-sm text-gray-400 leading-none font-sans font-semibold",
    content:
      "text-md text-gray-500 leading-[1.5] font-sans font-semibold bg-gray-200 p-5 w-full rounded-md",
  },
};

const CookingStepList = ({ orders = [], images = [] }) => {
  return (
    <div className={styles.container}>
      {orders && orders.length > 0
        ? orders.map((order, index) => (
            <div className={styles.step.container} key={index}>
              <div className={styles.step.stepNumber}>{`${index + 1} / ${
                orders.length
              } 단계`}</div>
              <div className="grid grid-cols-[5fr_6fr] gap-4">
                <div className="flex rounded-md overflow-hidden">
                  <img
                    src={images && images.length >= index ? images[index] : ""}
                    alt={`step ${index + 1}`}
                  />
                </div>
                <div className="flex flex-col justify-start items-start">
                  <span className={styles.step.content}>{order}</span>
                </div>
              </div>
            </div>
          ))
        : "조리 순서 없음"}
    </div>
  );
};

CookingStepList.propTypes = {
  orders: PropTypes.array,
  className: PropTypes.string,
};

export default CookingStepList;
