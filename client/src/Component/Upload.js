import React, { useState, useEffect } from "react";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../Style/UploadCSS";

function Upload(props) {
  const [content, setContent] = useState("");

  const onSubmit = () => {
    let tempArr = [...props.contentList];
    tempArr.push(content);
    props.setContentList([...tempArr]);
    setContent("");
  };
  useEffect(() => {
    // 컴포넌트가 나타날 때 실행될 코드
    return () => {
      // 컴포넌트가 죽을 때 실행될 코드
    };
  }, []);
  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.currentTarget.value);
          }}
        />
        <label htmlFor="content">내용</label>
        <textarea />
        <UploadButtonDiv>
          <button
            onClick={() => {
              onSubmit();
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
