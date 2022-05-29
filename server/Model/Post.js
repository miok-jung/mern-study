const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    image: String,

    author: {
      // 몽구스가 관리하는 유니크한 아이디값으로 DB에 현재 _id로 저장이 된다.
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    repleNum: {
      type: Number,
      default: 0,
    },
  },
  { collection: "posts" }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
