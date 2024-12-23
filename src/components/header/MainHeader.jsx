import React from "react";
import Header from "./Header.jsx";
import IconButton from "../common/IconButton.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-start items-center"
      onClick={() => {
        navigate("/");
      }}
    >
      <img
        src={logo}
        alt="logo"
        className="w-10 h-10 filter-none invert"
        style={{ filter: "invert(1)" }}
      />
    </div>
  );
};

const Title = () => {
  return (
    <div className="flex justify-center items-center text-black">
      <h1>맛있는 절약</h1>
    </div>
  );
};

const UserMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex justify-end items-center gap-1">
      {/* <IconButton
        icon={<i className="fa-solid fa-user"></i>}
        label="프로필"
        onClick={() => {
          navigate("/profile");
        }}
      /> */}
      <button
        className="text-xs whitespace-nowrap font-bold text-white bg-green-500 px-2 py-1 rounded-md flex items-center gap-1"
        onClick={() => {
          navigate("/profile");
        }}
      >
        <i className="fa-solid fa-user text-xxs"></i> 프로필
      </button>
      {/* <IconButton
        icon={<i className="fa-solid fa-right-from-bracket"></i>}
        label="로그아웃"
        onClick={() => {
          logout();
        }}
      /> */}
      <button
        className="text-xs whitespace-nowrap font-bold text-white bg-green-500 px-2 py-1 rounded-md gap-1"
        onClick={() => {
          logout();
        }}
      >
        <i className="fa-solid fa-right-from-bracket"></i> 로그아웃
      </button>
    </div>
  );
};

const MainHeader = () => {
  return (
    <Header>
      <div className="w-full flex flex-row-reverse items-center">
        {/* <Logo />
        <Title /> */}
        <UserMenu />
      </div>
    </Header>
  );
};

export default MainHeader;
