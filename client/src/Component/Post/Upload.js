import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS";
import axios from "axios";
import ImageUpload from "./ImageUpload";

function Upload(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");

  let navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === "" || content === "") {
      return alert("모든 항목을 채워주세요!");
    }
    let body = {
      title: title,
      content: content,
      image: img,
    };
    axios
      .post("/api/post/submit", body)
      .then((res) => {
        if (res.data.success) {
          alert("글 작성이 완료되었습니다.");
          navigate("/");
        } else {
          alert("글 작성에 실패하였습니다.");
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
        <ImageUpload setImg={setImg} />
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
}

export default Upload;
