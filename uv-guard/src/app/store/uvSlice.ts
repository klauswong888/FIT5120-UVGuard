// uvSlice.ts (Redux 状态管理)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define UV Index state type
interface UVState {
  uvIndex: number;
  location: string;
  date: string;
  time: string;
  skinTone: string; 
  recommendation: string;  // UV recommendation
  reapplyTime: number;  // Sunscreen reapplication time (in minutes)
  isSafeToGoOut: boolean;
}

// Initial state
const initialState: UVState = {
  uvIndex: 0,
  location: "Melbourne, Australia",
  date: new Date().toISOString().split("T")[0], // Default to today
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  skinTone: '',
  recommendation: "No recommendation available", // Default
  reapplyTime: 0, // Default no data
  isSafeToGoOut: true,
};

// Create Redux Slice
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

// Export Actions
export const { setUVIndex, setLocation, setDate, setTime, setSkinTone, setRecommendation, setReapplyTime, setIsSafeToGoOut } = uvSlice.actions;

// Export Reducer
export default uvSlice.reducer;