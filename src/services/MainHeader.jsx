import React from "react";
import Header from "../components/Header.jsx";

const Logo = () => {
    return (
        <div className='flex justify-start'>
            <h1>Logo</h1>
        </div>
    );
};

const Title = () => {
    return (
        <div className='flex justify-center'>
            <h1>맛있는 절약</h1>
        </div>

    );
};

const UserMenu = () => {
    return (
        <div className='flex justify-end'>
            <i className="fa-solid fa-bars"></i>
        </div>
    );
}

const MainHeader = () => {
    return (
        <Header first={Logo} second={Title} third={UserMenu} />
    );
}

export default MainHeader;