import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { PostDiv, SpinnerDiv, Post, BtnDiv } from "../../Style/PostDetailCSS";

const Detail = () => {
  // Route path에서 사용된 변수값을 가져온다.
  let params = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // console.log(params); // {postNum: '1'}
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("p", postInfo);
  }, [postInfo]);
  return (
    <PostDiv>
      {flag ? (
        <>
          <Post>
            <h1>{postInfo.title}</h1>
            <p>{postInfo.content}</p>
          </Post>
          <BtnDiv>
            <button className="edit">수정</button>
            <button className="delete">삭제</button>
          </BtnDiv>
        </>
      ) : (
        <SpinnerDiv animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </SpinnerDiv>
      )}
    </PostDiv>
  );
};

export default Detail;
