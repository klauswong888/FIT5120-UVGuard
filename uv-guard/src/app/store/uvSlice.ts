// uvSlice.ts (Redux 状态管理)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义 UV Index 状态类型
interface UVState {
  uvIndex: number;
  location: string;
  date: string;
  time: string;
  skinTone: string; 
  recommendation: string;  // ✅ UV 建议
  reapplyTime: number;  // ✅ 防晒霜重新涂抹时间 (单位：分钟)
  isSafeToGoOut: boolean;
}

// 初始状态
const initialState: UVState = {
  uvIndex: 0,
  location: "Melbourne, Australia",
  date: new Date().toISOString().split("T")[0], // 默认当天
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  skinTone: '',
  recommendation: "No recommendation available", // 默认
  reapplyTime: 0, // 默认无数据
  isSafeToGoOut: true,
};

// 创建 Redux Slice
const uvSlice = createSlice({
  name: "uv",
  initialState,
  reducers: {
    setUVIndex: (state, action: PayloadAction<number>) => {
      state.uvIndex = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setSkinTone: (state, action: PayloadAction<string>) => { 
      state.skinTone = action.payload;
    },
    setRecommendation: (state, action: PayloadAction<string>) => {
      state.recommendation = action.payload;
    },
    setReapplyTime: (state, action: PayloadAction<number>) => {
      state.reapplyTime = action.payload;
    },
    setIsSafeToGoOut: (state, action: PayloadAction<boolean>) => {
      state.isSafeToGoOut = action.payload;
    },
  },
});

// 导出 Action
export const { setUVIndex, setLocation, setDate, setTime, setSkinTone, setRecommendation, setReapplyTime, setIsSafeToGoOut } = uvSlice.actions;

// 导出 Reducer
export default uvSlice.reducer;