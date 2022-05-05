import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice";
import firebase from "./firebase";

import Heading from "./Component/Heading";
import List from "./Component/Post/List";
import Upload from "./Component/Post/Upload";
import Detail from "./Component/Post/Detail";
import Edit from "./Component/Post/Edit";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";

const App = () => {
  const dispatch = useDispatch();
  // 로그인
  useEffect(() => {
    // auth().onAuthStateChanged() : 사용자 상태변화 추적 함수
    // 실행결과에 따라 userInfo가 넘어오게 된다.
    // 로그아웃 or 로그인하지 않는 상태에는 null값이 출력이 된다.
    // 로그인시 해당 유저의 정보를 보여준다.
    firebase.auth().onAuthStateChanged((userInfo) => {
      // console.log("userInfo: ", userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        {/* 콜론(:)은 변수설정 */}
        <Route path="/post/:postNum" element={<Detail />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
