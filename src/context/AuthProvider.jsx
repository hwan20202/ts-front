import React, { createContext, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {fetchUserInfo} from "../utils/fetchData.jsx";

const AuthContext = createContext(undefined);

const getSessionIdFromCookie = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; JSESSIONID=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const checkSessionValidity = async () => {
    const sessionId = getSessionIdFromCookie();

    if (!sessionId) {
        console.log('not sessionID');
        return false; // 세션 ID가 없는 경우 비로그인 상태로 간주
    }

    const result = await fetchUserInfo();
    if(result.success) console.log(result.data);
    else console.log(result.error);
    return result.success;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const validateSession = async () => {
            const isValidSession = await checkSessionValidity();

            if (!isValidSession) {
                navigate('/login'); // 세션이 유효하지 않으면 로그인 페이지로 이동
            }
        };

        validateSession();
    }, []);

    return (
        <AuthContext.Provider value={''}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
