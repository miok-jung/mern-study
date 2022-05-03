import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../Style/UserCSS";
import firebase from "../../firebase";
import axios from "axios";

const Register = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);

  let navigate = useNavigate();

  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(Name && Email && PW && PWConfirm)) {
      return alert("모든 값을 채워주세요!");
    }
    if (PW !== PWConfirm) {
      return alert("비밀번호와 비밀번호 확인 값은 같아야 합니다.");
    }
    let createUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW);

    await createUser.user.updateProfile({
      displayName: Name,
    });

    let body = {
      email: createUser.user.multiFactor.user.email,
      displayName: createUser.user.multiFactor.user.displayName,
      uid: createUser.user.multiFactor.user.uid,
    };
    axios.post("/api/user/register", body).then((res) => {
      setFlag(false);
      if (res.data.success) {
        navigate("/login");
      } else {
        return alert("회원가입이 실패하였습니다.");
      }
    });
  };

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
          minLength={8}
          onChange={(e) => {
            setPW(e.currentTarget.value);
          }}
        />
        <label htmlFor="re_confirm_password">비밀번호 확인</label>
        <input
          id="re_confirm_password"
          type="password"
          value={PWConfirm}
          minLength={8}
          onChange={(e) => {
            setPWConfirm(e.currentTarget.value);
          }}
        />
        <button
          disabled={Flag}
          onClick={(e) => {
            RegisterFunc(e);
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
};

export default Register;
