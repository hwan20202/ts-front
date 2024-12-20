import React, { useEffect, useState } from "react";
import mainLoading from "../assets/gif/mainLoading.gif";
import Gif from "../components/Gif";

const style = {
  loading:
    "w-full h-screen flex flex-col justify-center items-center bg-white gap-4",
  gif: "w-1/3 aspect-square object-cover object-center rounded-xl",
  tips: "text-base font-semibold text-black leading-none whitespace-nowrap transition-all duration-300 ease-out",
  tipsContainer:
    "flex flex-col justify-center items-center bg-gray-200  py-2 px-4 rounded-md",
};

const tips = [
  "조금만 기다려주세요. 1",
  "조금만 기다려주세요. 2",
  "조금만 기다려주세요. 3",
  "조금만 기다려주세요. 4",
];

const RecipeLoading = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
        setFade(true);
      }, 300);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.loading}>
      <Gif src={mainLoading} className={style.gif} />
      <div className={style.tipsContainer}>
        <span
          className={`${style.tips} transform ${
            !fade ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {tips[currentTipIndex]}
        </span>
      </div>
    </div>
  );
};

export default RecipeLoading;
