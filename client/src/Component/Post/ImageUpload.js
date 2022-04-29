import React from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const ImageUpload = (props) => {
  const FileUpload = (e) => {
    // console.log(e.target.files); // {lastModified, lastModifiedDate, name, size, type}
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    // for (const keyValue of formData) console.log(keyValue);
    axios.post("/api/post/image/upload", formData).then((res) => {
      props.setImg(res.data.filePath);
    });
  };

  return (
    <div>
      {/*
        부트스트랩에서는 기본적으로 Form.Control에서 클릭시 파란색의 border 값이 나오기 때문에, className에 shadow-none이라는 클래스를 추가함으로써 이 border를 제거해준다.
        accept는 현재 이미지만 업로드를 하기위해 설정을 하였다.
        */}
      <Form.Control
        type="file"
        className="shadow-none"
        accept="image/*"
        onChange={(e) => FileUpload(e)}
      />
    </div>
  );
};

export default ImageUpload;
