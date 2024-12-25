import React, { useRef } from "react";
import PropTypes from "prop-types";

const styles = {
  textColor: {
    white: "text-white",
    gray: "text-gray-500",
    black: "text-gray-800",
    green: "text-green-500",
  },
  container: "w-full flex flex-col bg-white p-6 min-h-[200px] shrink-0",
  title: "text-left text-xl font-bold p-0 mb-4",
  step: {
    container:
      "flex flex-col justify-center items-start mb-4 p-4 rounded-lg font-semibold",
    stepNumber: "text-md leading-none font-sans font-semibold mb-1",
    textarea:
      "w-full  bg-gray-300 text-base leading-[1.7] rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-green-500 shadow-md",
  },
};

const EditCookingStepList = ({
  cooking_order,
  // cooking_img,
  // editCookingImg,
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
      <h2 className={styles.title + " " + styles.textColor.black}>조리 순서</h2>
      <div className="flex flex-col gap-3">
        {cooking_order && cooking_order.length > 0
          ? cooking_order.map((order, index) => (
              <div key={index}>
                <div
                  className={
                    styles.step.stepNumber + " " + styles.textColor.gray
                  }
                >{`${index + 1} 단계`}</div>
                <textarea
                  type="text"
                  defaultValue={order}
                  onChange={(e) =>
                    editCookingOrder({ index, order: e.target.value })
                  }
                  className={
                    styles.step.textarea + " " + styles.textColor.black
                  }
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
