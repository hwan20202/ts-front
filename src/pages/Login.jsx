import React from "react";
import { login } from "../utils/fetchData.jsx";

const style = {
  container: "flex flex-col justify-center items-center h-screen",
  title: "text-black text-2xl font-bold mb-10",
  button: "h-12 bg-yellow-400 rounded-lg text-bold px-10",
};

const Login = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Login 해주시기 바랍니다</h1>
      <button onClick={login} className={style.button}>
        카카오로 로그인
      </button>
    </div>
  );
};

export default Login;
