/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //버튼 색상
        button: {
          primary: {
            DEFAULT: '#1E40AF', // 기본 색상 (파란색 계열)
            hover: '#60A5FA',   // 밝은 색상
            disabled: '#1E3A8A',
          }
        },
      },
      maxWidth: {
        'body': '1280px', // body에 사용할 max-width를 정의
      },
      screens: {
        'max-body': { 'max': '1200px' }, // 특정 요소의 미디어 쿼리에서 사용 가능
      },
    },
  },
  plugins: [],
}

