import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { fetchUserLogOut } from "../utils/fetchUserLogOut.jsx";
import { isLoggedIn } from "../utils/fetchData.jsx";
const AuthContext = createContext(undefined);

const checkSessionValidity = async () => {
  const result = await isLoggedIn();
  return result.isAuthenticated;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      const isValidSession = await checkSessionValidity();

      if (!isValidSession) {
        navigate("/login"); // 세션이 유효하지 않으면 로그인 페이지로 이동
      }
      setIsLoggedIn(isValidSession);
    };

    validateSession();
  }, []);

  const logout = async () => {
    const result = await fetchUserLogOut();
    if (result) {
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
