import React, { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../utils/fetchData.jsx";
import { fetchUserLogOut } from "../utils/fetchUserLogOut.jsx";

const AuthContext = createContext(undefined);

const logout = async () => {
  const result = await fetchUserLogOut();
  if (result.success) {
    console.log("logout");
    navigate("/login");
  }
};

const checkSessionValidity = async () => {
  const result = await fetchUserInfo();
  if (result.success) return result.success;
  else return false;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      const isValidSession = await checkSessionValidity();

      if (!isValidSession) {
        navigate("/login"); // 세션이 유효하지 않으면 로그인 페이지로 이동
      }
    };

    validateSession();
  }, []);

  return (
    <AuthContext.Provider value={{ logout }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
