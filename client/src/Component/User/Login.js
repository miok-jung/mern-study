import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../Style/UserCSS";

import firebase from "../../firebase";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();

  const SignInFunc = async (e) => {
    e.preventDefault();
    if (!(Email && Password)) {
      return alert("모든 값을 채워주세요.");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(Email, Password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setErrorMsg("존재하지 않는 이메일입니다.");
      } else if (err.code === "auth/wrong-password") {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setErrorMsg("로그인에 실패하였습니다.");
      }

      return;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  }, [ErrorMsg]);
  return (
    <LoginDiv>
      <form>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          tyep="email"
          value={Email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={Password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        {ErrorMsg !== "" && <p>{ErrorMsg}</p>}
        <button onClick={(e) => SignInFunc(e)}>로그인</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
};

export default Login;
