import React, {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import IconButton from "../components/IconButton.jsx";

const Logo = () => {
    return (
        <div className='flex justify-start'>
            <h1>Logo</h1>
        </div>
    );
};

const RecipeName = () => {
    return (
        <div className='flex justify-center'>
            <h1>갈비찜</h1>
        </div>

    );
};

const ShareIcon = () => {
    return (
        <i className="fa-solid fa-share"></i>
    );
}

const BookMarkIcon = (isMarked) => {
    return (
        <>
            {isMarked ? <i className="fa-solid fa-bookmark"></i>:<i className="fa-regular fa-bookmark"></i>}
        </>
    );
}

const { Kakao } = window;
const apiKey = import.meta.env.VITE_APP_KAKAO_KEY;

const FuncButtons = () => {
    // 현재 레시피의 북마크 여부
    const [isMarked, setMarked] = useState(false);

    useEffect(()=>{

        // init 해주기 전에 clean up 을 해준다.
        Kakao.cleanup();
        // 자신의 js 키를 넣어준다.
        Kakao.init(apiKey);
        // 잘 적용되면 true 를 뱉는다.
        console.log(Kakao.isInitialized());
    },[]);

    const share = () => {
        Kakao.Share.createDefaultButton({
            container: '#kakaotalk-sharing-btn',
            objectType: 'text',
            text:
                '기본 템플릿으로 제공되는 텍스트 템플릿은 텍스트를 최대 200자까지 표시할 수 있습니다. 텍스트 템플릿은 텍스트 영역과 하나의 기본 버튼을 가집니다. 임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오톡 공유는 다른 템플릿을 이용해 보낼 수 있습니다.',
            link: {
                mobileWebUrl: 'https://developers.kakao.com',
                webUrl: 'https://developers.kakao.com',
            },
        });
        console.log('share success!');
    }

    const bookMark = () => {
        console.log('bookMark success!');
        if (isMarked) {
            setMarked(false);
        } else {
            setMarked(true);
        }
    }

    return (
        <div className='grid grid-cols-4 justify-end'>
            <div></div>
            <div></div>
            <IconButton icon={ShareIcon} onClick={share} label='share-btn' id='kakaotalk-sharing-btn'/>
            <IconButton icon={BookMarkIcon(isMarked)} onClick={bookMark} label='bookmart-btn'/>
        </div>
    );
}

const RecipeHeader = () => {
    return (
        <Header first={Logo} second={RecipeName} third={FuncButtons} />
    );
}

export default RecipeHeader;