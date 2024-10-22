import React from "react";
import SearchBar from "../components/SearchBar.jsx";
import Button from "../components/Button.jsx";

const MenuSearchForm = () => {

    const searchByMenu = (keyword) => {
        if (keyword === 'undefined') {
            console.log('검색 키워드가 없습니다');
            return ;
        }
        console.log('searchByMenu' + keyword);
    }

    const searchByAI = () => {
        console.log('searchByAI');
    }

    return (
        <div>
            <div className='my-3'>
                <h3>오늘 먹고 싶은 음식은?(메뉴명으로 검색)</h3>
                <SearchBar label='검색' onSearch={searchByMenu}/>
            </div>

            <div className='flex justify-center'>
            <h3>오늘은 냉장고 파먹는 날!</h3>
                <Button label='AI 추천받기' size='sm' onClick={searchByAI}/>
            </div>

        </div>
    );
};

export default MenuSearchForm;