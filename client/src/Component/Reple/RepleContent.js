import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RepleContentDiv, RepleUploadDiv } from "../../Style/RepleCSS";

const RepleContent = (props) => {
  const [ModalFlag, setModalFlag] = useState(false);
  const [EditFlag, setEditFlag] = useState(false);
  const [Reple, setReple] = useState(props.reple.reple);
  const user = useSelector((state) => state.user);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (!Reple) {
      return alert("댓글 내용을 채워주세요!");
    }
    let body = {
      uid: user.uid,
      reple: Reple,
      postId: props.reple.postId,
      repleId: props.reple._id,
    };
    axios.post("/api/reple/edit", body).then((res) => {
      if (res.data.success) {
        setReple("");
        alert("댓글 수정이 성공하였습니다.");
        window.location.reload();
      } else {
        alert("댓글 수정이 실패하였습니다.");
      }
    });
  };
  return (
    <div>
      <RepleContentDiv>
        <div className="author">
          <p>{props.reple.author.displayName}</p>

          {props.reple.author.uid === user.uid && (
            <div className="modalControl">
              <span
                onClick={() => {
                  setModalFlag(true);
                }}
              >
                ...
              </span>
              {ModalFlag && (
                <div className="modalDiv" ref={ref}>
                  <p
                    onClick={() => {
                      setEditFlag(true);
                      setModalFlag(false);
                    }}
                  >
                    수정
                  </p>
                  <p className="delete">삭제</p>
                </div>
              )}
            </div>
          )}
        </div>
        {EditFlag ? (
          <RepleUploadDiv>
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
            <div className="cancel">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditFlag(false);
                }}
              >
                취소
              </button>
            </div>
          </RepleUploadDiv>
        ) : (
          <p>{props.reple.reple}</p>
        )}
      </RepleContentDiv>
    </div>
  );
};
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
export default RepleContent;
