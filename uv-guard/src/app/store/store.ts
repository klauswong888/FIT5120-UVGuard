import { configureStore } from "@reduxjs/toolkit";
import uvReducer from "./uvSlice"; 
import reminderReducer from "./reminderSlice";

// create Redux Store
export const store = configureStore({
  reducer: {
    uv: uvReducer, 
    reminder: reminderReducer,
  },
});

console.log("✅ Redux Store Created: ", store.getState());
// fetch Store type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
