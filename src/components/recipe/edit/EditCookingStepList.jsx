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

const EditCookingStepList = ({
  cooking_order,
  cooking_img,
  editCookingImg,
  editCookingOrder,
  addCookingOrder,
}) => {
  // delete orders

  // add orders
  const handleAddOrder = (newOrder) => {
    addCookingOrder(newOrder);
  };

  const handleOrderChange = (index, value) => {
    editCookingOrder({ index, order: value });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>조리 순서</h2>
      <div className="flex flex-col gap-2">
        {cooking_order && cooking_order.length > 0
          ? cooking_order.map((order, index) => (
              <div key={index}>
                <div className={styles.step.stepNumber}>{`${
                  index + 1
                } 단계`}</div>
                <textarea
                  type="text"
                  defaultValue={order}
                  onChange={(e) =>
                    editCookingOrder({ index, order: e.target.value })
                  }
                  className={styles.step.textarea}
                />
              </div>
            ))
          : "조리 순서 없음"}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md mt-2"
          onClick={() => handleAddOrder("")}
        >
          추가
        </button>
      </div>
    </div>
  );
};

EditCookingStepList.propTypes = {
  cooking_order: PropTypes.array.isRequired,
  cooking_img: PropTypes.array.isRequired,
  editCookingOrder: PropTypes.func.isRequired,
  editCookingImg: PropTypes.func.isRequired,
};

export default EditCookingStepList;
