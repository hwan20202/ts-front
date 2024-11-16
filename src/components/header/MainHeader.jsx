import React from "react";
import Header from "./Header.jsx";
import IconButton from "../common/IconButton.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";

const Logo = () => {
  return (
    <div className="flex justify-start">
      <h1>Logo</h1>
    </div>
  );
};

const Title = () => {
  return (
    <div className="flex justify-center">
      <h1>맛있는 절약</h1>
    </div>
  );
};

const UserMenu = () => {
  const { logout } = useAuth();
  return (
    <div className="flex justify-end">
      <IconButton
        icon={<i className="fa-solid fa-bars"></i>}
        label="메뉴"
        onClick={() => {}}
      />
      <IconButton
        icon={<i className="fa-solid fa-right-from-bracket"></i>}
        label="로그아웃"
        onClick={() => logout()}
      />
    </div>
  );
};

const MainHeader = () => {
  return <Header first={Logo} second={Title} third={UserMenu} />;
};

export default MainHeader;
