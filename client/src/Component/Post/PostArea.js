import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Detail from "./Detail";
import RepleArea from "../Reple/RepleArea";
import { SpinnerDiv } from "../../Style/PostDetailCSS";

const PostArea = () => {
  let params = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  useEffect(() => {
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

  return (
    <div>
      {Flag ? (
        <>
          <Detail postInfo={postInfo} />
          <RepleArea postId={postInfo._id} />
        </>
      ) : (
        <SpinnerDiv animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </SpinnerDiv>
      )}
    </div>
  );
};

export default PostArea;
