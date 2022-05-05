import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

// NOTE Redux Store을 생성
export default configureStore({
  reducer: {
    // NOTE user이란 이름으로 userSlice를 할당
    user: userSlice,
  },
  // NOTE 비직렬화 코드를 보내는 것에 대한 에러문을 무시하는 코드?
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
