/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        //버튼 색상
        button: {
          primary: {
            DEFAULT: "#1E40AF", // 기본 색상 (파란색 계열)
            hover: "#60A5FA", // 밝은 색상
            disabled: "#1E3A8A",
          },
        },
      },
      maxWidth: {
        body: "640px", // body에 사용할 max-width를 정의
      },
      screens: {
        "max-body": { max: "1200px" }, // 특정 요소의 미디어 쿼리에서 사용 가능
      },
      fontSize: {
        xxs: "0.625rem",
      },
      boxShadow: {
        lg: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
        sm: "0 0 5px 0 rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [scrollbarHide],
};
