// NOTE Action과 Payload를 간편하게 해줄 수 있는 기능
// LINK https://ko.redux.js.org/tutorials/fundamentals/part-8-modern-redux/#immutable-updates-with-immer

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: "",
    uid: "",
    // NOTE accessToken은 개인 인증 토큰이다.
    // NOTE 로그인을 할 때마다 토큰이 값이 바뀌지는 않지만, 현재 로그인 여부 추적을 이 토큰으로 사용
    accessToken: "",
  },
  reducers: {
    // NOTE 로그인
    loginUser(state, action) {
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
    },
    // NOTE 로그아웃
    clearUser(state) {
      state.displayName = "";
      state.uid = "";
      state.accessToken = "";
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
