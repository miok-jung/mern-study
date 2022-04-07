import styled from "@emotion/styled";

const PostDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 756px;
  margin: 0 auto !important;
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const SpinnerDiv = styled.div`
  width: 100%;
  height: calc(100vh - 2rem);
  display: flex;
  aligh-content: center;
  align-items: center;
  justify-content: center;
`;

const Post = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
  padding: 30px 20px;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
    0px 15px 12px rgba(0, 0, 0, 0.1);
  h1 {
    font-weight: bold;
  }
  p {
    margin-bottom: 0px;
  }
`;

const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
  button {
    border-radius: 15px;
    padding: 5px 10px;
    font-weight: bold;
    &.edit {
      background-color: white;
      color: black;
      border: 1px solid #000;
      &:hover {
        background-color: #000;
        color: #fff;
        border: 1px solid #000;
      }
    }
    &.delete {
      margin-left: 10px;
      background-color: red;
      color: #fff;
      border: 1px solid red;
      &:hover {
        background-color: #fff;
        color: red;
        border: 1px solid red;
      }
    }
  }
`;

export { PostDiv, SpinnerDiv, Post, BtnDiv };
