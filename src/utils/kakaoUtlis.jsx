const { Kakao } = window;
const apiKey = import.meta.env.VITE_APP_KAKAO_KEY;

export const initKakao = () => {
  // init 해주기 전에 clean up 을 해준다.
  Kakao.cleanup();
  // 자신의 js 키를 넣어준다.
  Kakao.init(apiKey);
  // 잘 적용되면 true 를 뱉는다.
  Kakao.isInitialized();
};

export const share = ({ path, title, main_img, description }) => {
  const link = `https://ktb-project-domain.shop/${path}`;
  // const link = `http://localhost:5173/${path}`;
  Kakao.Share.createDefaultButton({
    container: "#kakaotalk-sharing-btn",
    objectType: "feed",
    content: {
      title: `"${title}" 레시피를 공유했습니다`,
      description: "AI가 만든 레시피를 공유해보세요",
      imageUrl: `${main_img}`,
      link: {
        mobileWebUrl: link,
        webUrl: link,
      },
    },
    itemContent: {},
    social: {},
    buttons: [
      {
        title: `레시피 보러가기`,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
    ],
  });
  console.log("kakaoUtlis success!");
};
