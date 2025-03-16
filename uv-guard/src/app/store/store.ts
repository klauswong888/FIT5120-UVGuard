import { configureStore } from "@reduxjs/toolkit";
import uvReducer from "./uvSlice"; 
import reminderReducer from "./reminderSlice";

// 创建 Redux Store
export const store = configureStore({
  reducer: {
    uv: uvReducer, 
    reminder: reminderReducer,
  },
});

console.log("✅ Redux Store Created: ", store.getState());
// 获取 Store 的类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
