import React from "react";
import PropTypes from "prop-types";
import CookingOrder from "./view/CookingOrder";
import ToggleButton from "../common/ToggleButton";
import { useState } from "react";
const styles = {
  step: {
    container: "flex flex-col justify-center items-start gap-2 p-2 rounded-lg",
    stepNumber: "text-sm text-gray-400 leading-none font-sans font-semibold",
    content:
      "text-md text-gray-500 leading-[1.5] font-sans font-semibold bg-gray-200 p-5 w-full rounded-md",
  },
};

const CookingStepList = ({ orders = [], images = [] }) => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end items-center">
        <ToggleButton
          isOpen={isImageOpen}
          onSetTrue={() => setIsImageOpen(true)}
          onSetFalse={() => setIsImageOpen(false)}
          trueClassName="text-gray-500"
          falseClassName="text-gray-500"
        >
          {isImageOpen ? (
            <span className="text-sm leading-[1.8]">전체 이미지 닫기</span>
          ) : (
            <span className="text-sm leading-[1.8]">전체 이미지 보기</span>
          )}
        </ToggleButton>
      </div>
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <CookingOrder
            key={index}
            title={`${index + 1}단계`}
            image={images[index]}
            isImageOpenDefault={isImageOpen}
          >
            <div className="text-sm text-gray-500 leading-[1.8] bg-gray-200 px-4 py-2 w-full rounded-md mt-2">
              {order}
            </div>
          </CookingOrder>
        ))
      ) : (
        <div className="text-sm text-gray-500 leading-[1.8] bg-gray-200 px-4 py-2 w-full rounded-md">
          조리 순서 없음
        </div>
      )}
    </>
  );
};

CookingStepList.propTypes = {
  orders: PropTypes.array,
  className: PropTypes.string,
};

export default CookingStepList;
