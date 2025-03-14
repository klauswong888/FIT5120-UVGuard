import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义 UV Index 状态类型
interface UVState {
  uvIndex: number;
}

// 初始状态
const initialState: UVState = {
  uvIndex: 0, // 默认 UV 指数
};

// 创建 Slice
const uvSlice = createSlice({
  name: "uv",
  initialState,
  reducers: {
    // 设置 UV 指数
    setUVIndex: (state, action: PayloadAction<number>) => {
      state.uvIndex = action.payload;
    },
  },
});

// 导出 Action
export const { setUVIndex } = uvSlice.actions;

// 导出 Reducer
export default uvSlice.reducer;
