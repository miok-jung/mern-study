import React, { useState } from "react";
import LoginDiv from "../../Style/UserCSS";

const Register = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");

  return (
    <LoginDiv>
      <form>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="name"
          value={Name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <label htmlFor="re_email">이메일</label>
        <input
          id="re_email"
          type="email"
          value={Email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label htmlFor="re_password">비밀번호</label>
        <input
          id="re_password"
          type="password"
          value={PW}
          onChange={(e) => {
            setPW(e.currentTarget.value);
          }}
        />
        <label htmlFor="re_confirm_password">비밀번호 확인</label>
        <input
          id="re_confirm_password"
          type="password"
          value={PWConfirm}
          onChange={(e) => {
            setPWConfirm(e.currentTarget.value);
          }}
        />
        <button>회원가입</button>
      </form>
    </LoginDiv>
  );
};

export default Register;
