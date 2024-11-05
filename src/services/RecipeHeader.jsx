import React, {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import IconButton from "../components/IconButton.jsx";
import PropTypes from "prop-types";
import { initKakao, share } from "../utils/kakaoUtlis.jsx";
import {fetchSetBookMark} from "../utils/fetchData.jsx";

const Logo = () => {
    return (
        <div className='flex justify-start'>
            <h1>Logo</h1>
        </div>
    );
};

const RecipeName = ( { label }) => {
    return (
        <div className='flex justify-center'>
            <h1>{label}</h1>
        </div>

    );
};

RecipeName.propTypes = {
    label: PropTypes.string.isRequired,
}

const ShareIcon = () => {
    return (
        <i className="fa-solid fa-share"></i>
    );
}

const ShareButton = () => {
    useEffect(()=>{
        initKakao();
    },[]);

    return (
        <IconButton icon={ShareIcon} onClick={share} label='kakaoUtlis-btn' id='kakaotalk-sharing-btn'/>
    );
}

const BookMarkIcon = (isMarked) => {
    return (
        <>
            {isMarked ? <i className="fa-solid fa-bookmark"></i>:<i className="fa-regular fa-bookmark"></i>}
        </>
    );
}

const BookMarkButton = () => {
    // 현재 레시피의 북마크 여부
    const [isMarked, setMarked] = useState(false);

    const bookMark =  async () => {
        console.log('bookMark success!');
        if (isMarked) {
            const response = await fetchSetBookMark(false);
            if (response) setMarked(false);

        } else {
            const response = await fetchSetBookMark(true);
            if (response) setMarked(true);

        }
    }

    return (
        <IconButton icon={BookMarkIcon(isMarked)} onClick={bookMark} label='bookmart-btn'/>
    );
}

const FuncButtons = () => {
    return (
        <div className='grid grid-cols-4 justify-end'>
            <div></div>
            <div></div>
            <ShareButton />
            <BookMarkButton />
        </div>
    );
}

const RecipeHeader = ( { recipeName, className } ) => {

    const classList = `
    ${className}
    `

    return (
        <Header first={Logo} second={<RecipeName label={recipeName} />} third={FuncButtons} className={classList} />
    );
}

RecipeHeader.propTypes = {
    recipeName: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default RecipeHeader;