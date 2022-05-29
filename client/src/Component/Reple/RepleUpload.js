import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import userSlice from "../../Reducer/userSlice";

const RepleUpload = () => {
  const [Reple, setReple] = useState("");
  const user = useSelector((state) => state.user);

  const SubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      reple: Reple,
      uid: user.uid,
    };
    axios.post("/api/reple/submit", body);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={Reple}
          onChange={(e) => {
            setReple(e.currentTarget.value);
          }}
        />
        <button
          onClick={(e) => {
            SubmitHandler(e);
          }}
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default RepleUpload;
