import { configureStore } from "@reduxjs/toolkit";
import uvReducer from "./uvSlice"; // 导入 UV Reducer

// 创建 Redux Store
export const store = configureStore({
  reducer: {
    uv: uvReducer, // 注册 UV Reducer
  },
});

// 获取 Store 的类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
