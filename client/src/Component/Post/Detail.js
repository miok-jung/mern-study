import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { PostDiv, SpinnerDiv, Post, BtnDiv } from "../../Style/PostDetailCSS";
import { useSelector } from "react-redux";

const Detail = (props) => {
  let params = useParams();
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

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
      <>
        <Post>
          <h1>{props.postInfo.title}</h1>
          <h3>{props.postInfo.author.displayName}</h3>
          {props.postInfo.image ? (
            <img
              src={props.postInfo.image}
              style={{ width: "100%", height: "auto" }}
            />
          ) : null}
          <p>{props.postInfo.content}</p>
        </Post>
        {user.uid === props.postInfo.author.uid && (
          <BtnDiv>
            <Link to={`/edit/${props.postInfo.postNum}`}>
              <button className="edit">수정</button>
            </Link>
            <button className="delete" onClick={() => deleteHandler()}>
              삭제
            </button>
          </BtnDiv>
        )}
      </>
    </PostDiv>
  );
};

export default Detail;
