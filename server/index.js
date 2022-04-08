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
const { Counter } = require("./Model/Counter.js");

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

app.post("/api/post/submit", (req, res) => {
  let temp = req.body;
  // fint({중괄호 안에는 조건문을 넣을 수 있다.})
  // name이 counter인 것을 Counter에서 찾는다.
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      const CommunityPost = new Post(temp);
      CommunityPost.save().then(() => {
        // updateOne에서 첫번째 중괄호(쿼리)는 어떤 document를 찾을 것인지
        // 두번째 중괄호(쿼리)는 어떻게 업데이트를 시킬 것인지를 정리한다.
        Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

app.post("/api/post/list", (req, res) => {
  // find document
  Post.find()
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

app.post("/api/post/detail", (req, res) => {
  // find document
  Post.findOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

app.post("/api/post/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});
