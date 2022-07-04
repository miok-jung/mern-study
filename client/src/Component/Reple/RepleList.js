import React, { useEffect, useState } from "react";
import axios from "axios";

const RepleList = (props) => {
  const [repleList, setRepleList] = useState([]);
  useEffect(() => {
    let body = {
      postId: props.postId,
    };
    console.log(body);
    axios.post("/api/reple/getReple", body).then((res) => {
      if (res.data.success) {
        setRepleList([...res.data.repleList]);
      }
    });
  }, []);
  return (
    <div>
      {repleList.map((reple, idx) => {
        return <div key={idx}>{reple.reple}</div>;
      })}
    </div>
  );
};

export default RepleList;
