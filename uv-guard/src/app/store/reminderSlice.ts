import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// **Get initial value from Cookies**
const getInitialState = (): ReminderState => {
  try {
    const reminderCookie = Cookies.get("reminder");
    if (reminderCookie) {
      const parsed = JSON.parse(reminderCookie);
      return {
        timing: parsed.timing || null,
        frequency: parsed.frequency || 5,
        active: true, // Ensure Reminder is active when Redux starts
        nextReminderIn: null, // Remaining time (minutes)
      };
    }
  } catch (error) {
    console.error("Failed to parse reminder from cookies:", error);
  }
  return {
    timing: null,
    frequency: 5, // Frequency (minutes)
    active: false, // Whether the reminder is active
    nextReminderIn: null,
  };
};

// ✅ Define Redux State type
interface ReminderState {
  timing: string | null; // Reminder time (format: "HH:mm")
  frequency: number; // Frequency (minutes)
  active: boolean; // Whether in reminder state
  nextReminderIn: number | null; // Time remaining until the next reminder (minutes)
}

const initialState: ReminderState = getInitialState();

const reminderSlice = createSlice({
  name: "reminder",
  initialState,
  reducers: {
    setReminder: (state, action: PayloadAction<{ timing: string; frequency: number }>) => {
      state.timing = action.payload.timing; // Time when the user first applied sunscreen
      state.frequency = action.payload.frequency; // Frequency (minutes)
      state.active = true; // Start reminder
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
      // ✅ Only close the modal, do not change the state
    },
    stopReminder: (state) => {
      state.timing = null;
      state.frequency = 5;
      state.active = false;
      state.nextReminderIn = null;
      Cookies.remove("reminder"); // ✅ Clear Cookies
      console.log("🛑 Reminder stopped and removed from cookies.");
    },
  },
});

export const { setReminder, snoozeReminder, stopReminder } = reminderSlice.actions;
export default reminderSlice.reducer;

// ✅ **Calculate countdown to the next reminder**
const calculateNextReminder = (timing: string, frequency: number): number | null => {
  if (!timing) return null;
  
  const [hours, minutes] = timing.split(":").map(Number);
  const now = new Date();
  let nextReminder = new Date();
  nextReminder.setHours(hours, minutes, 0);

  // ⏳ If the current time has already passed the set time, calculate the next reminder point
  while (nextReminder < now) {
    nextReminder.setMinutes(nextReminder.getMinutes() + frequency);
  }

  return Math.ceil((nextReminder.getTime() - now.getTime()) / 60000);
};
