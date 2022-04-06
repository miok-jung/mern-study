import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { ListDiv, ListItem } from "../../Style/ListCSS";
import { Link } from "react-router-dom";

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
            <Link to={`/post/${post.postNum}`}>
              <p className="title">{post.title}</p>
              <p>{post.content}</p>
            </Link>
            <hr />
          </ListItem>
        );
      })}
      <Button>Test!</Button>
    </ListDiv>
  );
};

export default List;
