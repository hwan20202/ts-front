import React, { useEffect, useState } from "react";
import mainLoading from "../assets/gif/mainLoading.gif";
import Gif from "../components/Gif";

const style = {
  loading:
    "w-full h-screen flex flex-col justify-center items-center bg-white gap-4 px-10",
  gif: "aspect-square object-cover object-center rounded-xl",
  tips: "text-base font-semibold text-black leading-[1.7] transition-all duration-300 ease-out",
  tipsContainer:
    "flex flex-col justify-center items-center bg-gray-200  py-2 px-4 rounded-md",
};

const tips = [
  "매운맛 레벨 안내: 한국 라면 스코빌 지수(SHU)에 따라 매운맛은 1단계(500~640)부터 5단계(10,000)까지 구분됩니다.",
  "조리 숙련도에 따른 시간 조정: 초급, 중급, 고급으로 나뉘며 숙련도에 따라 조리 시간과 설명 수준이 달라집니다.",
  "레시피 영양소 분석 기준: 2020 한국인 영양소 섭취기준에 따라 곡류, 단백질류, 채소류, 과일류, 우유류로 분석됩니다.\n 이 기준은 국민의 건강증진 및 만성질환 예방을 위한 에너지와 각 영양소의 적정 섭취 수준을 제시합니다.",
  "‘2020 한국인 영양소 섭취기준’ 개요: 국민 건강증진과 만성질환 예방을 위한 기준으로 2020년 12월 22일 발표되었습니다.",
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
      <div className="w-2/3 flex justify-center items-center overflow-hidden">
        <Gif src={mainLoading} className={style.gif} />
      </div>
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
