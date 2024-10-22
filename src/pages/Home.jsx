import React, {useEffect} from 'react';
import MenuSearchForm from "../services/MenuSearchForm.jsx";
const { Kakao } = window;

const Home = () => {
    return (
        <div className="Home-page w-full">
            <MenuSearchForm />
        </div>
    );
};

export default Home;