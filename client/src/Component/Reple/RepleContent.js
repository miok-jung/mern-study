import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RepleContentDiv } from "../../Style/RepleCSS";

const RepleContent = (props) => {
  const [ModalFlag, setModalFlag] = useState(false);
  const user = useSelector((state) => state.user);
  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));
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
                  <p>수정</p>
                  <p className="delete">삭제</p>
                </div>
              )}
            </div>
          )}
        </div>
        <p>{props.reple.reple}</p>
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
