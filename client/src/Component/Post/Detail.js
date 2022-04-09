import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { PostDiv, SpinnerDiv, Post, BtnDiv } from "../../Style/PostDetailCSS";

const Detail = () => {
  // Route path에서 사용된 변수값을 가져온다.
  let params = useParams();
  let navigate = useNavigate();
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

  const deleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then((res) => {
          if (res.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패하였습니다.");
        });
    }
  };
  return (
    <PostDiv>
      {flag ? (
        <>
          <Post>
            <h1>{postInfo.title}</h1>
            <p>{postInfo.content}</p>
          </Post>
          <BtnDiv>
            <Link to={`/edit/${postInfo.postNum}`}>
              <button className="edit">수정</button>
            </Link>
            <button className="delete" onClick={() => deleteHandler()}>
              삭제
            </button>
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
