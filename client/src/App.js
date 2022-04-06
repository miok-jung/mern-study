import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Heading from "./Component/Heading";
import List from "./Component/Post/List";
import Upload from "./Component/Post/Upload";
import Detail from "./Component/Post/Detail";

const App = () => {
  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        {/* 콜론(:)은 변수설정 */}
        <Route path="/post/:postNum" element={<Detail />} />
      </Routes>
    </>
  );
};

export default App;
