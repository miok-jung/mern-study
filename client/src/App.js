import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Test from "./Test";
import Heading from "./Component/Heading";
import List from "./Component/List";
import Upload from "./Component/Upload";

function App() {
  const [contentList, setContentList] = useState([]);
  return (
    <>
      <Heading />
      <Routes>
        <Route
          path="/list"
          element={
            <List contentList={contentList} setContentList={setContentList} />
          }
        />
        <Route
          path="/upload"
          element={
            <Upload contentList={contentList} setContentList={setContentList} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
