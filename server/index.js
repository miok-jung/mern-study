const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5000;
const config = require("./config/key");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log("Connecting MongoDB");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  // req : 클라이언트에서 서버측으로 보내는 요청
  // res : 서버측에서 클라이언트로 보내는 응답
  res.sendFile(path.join(__dirname, "../client/build/index.html")); // 상대경로 입력, 현재경로는 __dirname을 쓸 수 있다.
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html")); // 상대경로 입력, 현재경로는 __dirname을 쓸 수 있다.
});
app.post("/api/test", (req, res) => {
  // console.log(req.body);
  const CommunityPost = new Post({ title: "Test", content: "테스트입니다." });
  CommunityPost.save().then(() => {
    res.status(200).json({ success: true, text: "안녕하세요" });
  });
});
