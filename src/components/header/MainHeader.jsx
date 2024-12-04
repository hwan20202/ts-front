import React from "react";
import Header from "./Header.jsx";
import IconButton from "../common/IconButton.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-start items-center text-black"
      onClick={() => {
        navigate("/");
      }}
    >
      <i className="fa-solid fa-utensils"></i>
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
    <div className="flex justify-end items-center text-black">
      <IconButton
        icon={<i className="fa-solid fa-user"></i>}
        label="프로필"
        onClick={() => {
          navigate("/profile");
        }}
      />
      <IconButton
        icon={<i className="fa-solid fa-right-from-bracket"></i>}
        label="로그아웃"
        onClick={() => {
          logout();
          navigate("/");
        }}
      />
    </div>
  );
};

const MainHeader = () => {
  return (
    <Header>
      <div className="grid grid-cols-3 gap-2 w-full">
        <Logo />
        <Title />
        <UserMenu />
      </div>
    </Header>
  );
};

export default MainHeader;
