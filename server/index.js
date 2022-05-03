const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5000;
const config = require("./config/key");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 앞부분에 "/api/post"가 있는 경우는 Router/post.js에서 공통된 부분을 빼서 한번에 선언을 할 수 있다.
// 즉 클라이언트에서는 /api/post 이후 경로는 post.js안에서 추가를 하게 된다.
app.use("/api/post", require("./Router/post"));
app.use("/api/user", require("./Router/user"));
// 앞으로 /api/user에 오는 오청은 Router/user로 보내주세요. 라는 의미를 가진다.

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
