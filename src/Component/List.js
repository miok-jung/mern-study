import React, { useState } from "react";

function List(props) {
  const [content, setContent] = useState("");

  const onSubmit = () => {
    let tempArr = [...props.contentList];
    tempArr.push(content);
    props.setContentList([...tempArr]);
    setContent("");
  };
  return (
    <div>
      {props.contentList.map((content, idx) => {
        return (
          <div key={idx} style={{ width: "100%", marginLeft: "1rem" }}>
            내용 : {content}
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default List;
