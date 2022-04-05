import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { ListDiv, ListItem } from "../../Style/ListCSS";

const List = () => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((res) => {
        if (res.data.success) {
          setPostList([...res.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <ListDiv>
      {postList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <p className="title">{post.title}</p>
            <p>{post.content}</p>
            <hr />
          </ListItem>
        );
      })}
      <Button>Test!</Button>
    </ListDiv>
  );
};

export default List;
