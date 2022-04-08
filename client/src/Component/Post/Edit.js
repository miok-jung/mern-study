import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS";

const Edit = () => {
  let params = useParams();
  let navigate = useNavigate();

  const [postInfo, setPostInfo] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
    setTitle(postInfo.title);
    setContent(postInfo.content);
  }, [postInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === "" || content === "") {
      return alert("모든 항목을 채워주세요!");
    }
    let body = {
      title: title,
      content: content,
      postNum: params.postNum,
    };
    axios
      .post("/api/post/edit", body)
      .then((res) => {
        if (res.data.success) {
          alert("글 수정이 완료되었습니다.");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("글 수정에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <UploadButtonDiv>
          <button
            className="cancle"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            취소
          </button>
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            제출
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
};

export default Edit;
