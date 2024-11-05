import React from 'react';
import Button from "../components/Button.jsx";
import {login} from "../utils/fetchData.jsx";

const Login = () => {
    return (
        <div className="login-page">
            <h1>Login</h1>
            <Button label="Log In" onClick={login} size='xl' />
        </div>
    );
};

export default Login;