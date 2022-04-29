const express = require("express");
const router = express.Router();
const multer = require("multer"); // NOTE 파일을 업로드를 위해 사용되는 노드의 미들웨어

const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");

const setUpload = require("../Util/upload");

router.post("/submit", (req, res) => {
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

router.post("/list", (req, res) => {
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

router.post("/detail", (req, res) => {
  // find document
  Post.findOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

router.post("/edit", (req, res) => {
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

router.post("/delete", (req, res) => {
  // deleteOne : mongodb에서 게시글을 찾아 삭제하는 메소드
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

// NOTE 파일 업로드
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "image/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage }).single("file");
// router.post("/image/upload", (req, res) => {
//   // console.log(req.body, req.formData);
//   upload(req, res, (err) => {
//     if (err) {
//       // res.status(400).json({ success: false });
//       console.log(err);
//     } else {
//       // console.log(res.req.file);
//       res.status(200).json({ success: true, filePath: res.req.file.path });
//     }
//   });
// });

router.post("/image/upload", setUpload("mern-study/post"), (req, res) => {
  res.status(200).json({ success: true, filePath: res.req.file.location });
});

module.exports = router;
