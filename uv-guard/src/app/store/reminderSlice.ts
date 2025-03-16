import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// **从 Cookies 获取初始值**
const getInitialState = (): ReminderState => {
  try {
    const reminderCookie = Cookies.get("reminder");
    if (reminderCookie) {
      const parsed = JSON.parse(reminderCookie);
      return {
        timing: parsed.timing || null,
        frequency: parsed.frequency || 5,
        active: true, // 确保 Redux 启动时 Reminder 处于激活状态
        nextReminderIn: null, // 剩余时间 (分钟)
      };
    }
  } catch (error) {
    console.error("Failed to parse reminder from cookies:", error);
  }
  return {
    timing: null,
    frequency: 5, // 频率 (分钟)
    active: false, // 是否在进行提醒
    nextReminderIn: null,
  };
};

// ✅ 定义 Redux State 类型
interface ReminderState {
  timing: string | null; // 提醒时间 (格式: "HH:mm")
  frequency: number; // 频率 (分钟)
  active: boolean; // 是否处于提醒状态
  nextReminderIn: number | null; // 距离下一次提醒剩余时间 (分钟)
}

const initialState: ReminderState = getInitialState();

const reminderSlice = createSlice({
  name: "reminder",
  initialState,
  reducers: {
    setReminder: (state, action: PayloadAction<{ timing: string; frequency: number }>) => {
      state.timing = action.payload.timing; // 用户第一次涂防晒霜的时间
      state.frequency = action.payload.frequency; // 频率 (分钟)
      state.active = true; // 开始提醒
      state.nextReminderIn = calculateNextReminder(action.payload.timing, action.payload.frequency);
      Cookies.set(
        "reminder",
        JSON.stringify({
          timing: state.timing,
          frequency: state.frequency,
        }),
        { expires: 7, path: "/" }
      );
      console.log("✅ Updated Redux reminder state:", state);
    },
    snoozeReminder: (state) => {
        if (state.timing) {
        state.nextReminderIn = calculateNextReminder(state.timing, state.frequency);
      }
      console.log("🔕 Reminder snoozed. Next check at:", state.nextReminderIn);
      console.log("🔕 Reminder snoozed. Modal closed.");
      // ✅ 仅关闭弹窗，不改变状态
    },
    stopReminder: (state) => {
      state.timing = null;
      state.frequency = 5;
      state.active = false;
      state.nextReminderIn = null;
      Cookies.remove("reminder"); // ✅ 清除 Cookies
      console.log("🛑 Reminder stopped and removed from cookies.");
    },
  },
});

export const { setReminder, snoozeReminder, stopReminder } = reminderSlice.actions;
export default reminderSlice.reducer;

// ✅ **计算下一次提醒的倒计时**
const calculateNextReminder = (timing: string, frequency: number): number | null => {
  if (!timing) return null;
  
  const [hours, minutes] = timing.split(":").map(Number);
  const now = new Date();
  let nextReminder = new Date();
  nextReminder.setHours(hours, minutes, 0);

  // ⏳ 如果当前时间已经过了设置的时间，就计算下一个提醒点
  while (nextReminder < now) {
    nextReminder.setMinutes(nextReminder.getMinutes() + frequency);
  }

  return Math.ceil((nextReminder.getTime() - now.getTime()) / 60000);
};
