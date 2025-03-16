"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { snoozeReminder, stopReminder } from "@/app/store/reminderSlice";
import ReminderModal from "@/app/components/ReminderModal"; // Ensure `ReminderModal.tsx` exists

const ReminderChecker = () => {
  const dispatch = useAppDispatch();
  const reminder = useAppSelector((state) => state.reminder);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!reminder || !reminder.active || !reminder.timing) return;

    const calculateNextReminder = () => {
      if (!reminder.timing) return null;
      const [hours, minutes] = reminder.timing.split(":").map(Number);
      const frequency = reminder.frequency || 5;

      const now = new Date();
      let nextReminder = new Date();
      nextReminder.setHours(hours, minutes, 0);
      nextReminder.setSeconds(0); // Ensure seconds are 0
      console.log(`⏰ Initial Reminder Time: ${nextReminder.toLocaleTimeString()}`);

      while (nextReminder < now) {
        nextReminder.setMinutes(nextReminder.getMinutes() + frequency);
        console.log(`🔄 Updated Next Reminder: ${nextReminder.toLocaleTimeString()}`);
      }
      console.log(`✅ Final Next Reminder: ${nextReminder.toLocaleTimeString()}`);
      return nextReminder;
    };

    const checkReminder = () => {
      const now = new Date();
      console.log("🕒 Checking time:", now.toLocaleTimeString());
      const nextReminder = calculateNextReminder();
      if (!nextReminder) return;
      console.log(`Checking at ${now.toLocaleTimeString()}, next reminder at ${nextReminder.toLocaleTimeString()}`);

      if (now.getTime() >= nextReminder.getTime() - 1000) {
        console.log("🚨 Reminder Triggered! 🚨");
        setShowModal(true); // Show `Modal`
      }
    };

    console.log("⏳ Reminder Checker Started...");
    const interval = setInterval(checkReminder, 1000);
    return () => clearInterval(interval);
  }, [reminder]);

  const handleSnooze = () => {
    dispatch(snoozeReminder());
    setShowModal(false); // Close `Modal`
  };

  const handleStop = () => {
    dispatch(stopReminder());
    setShowModal(false); // Close `Modal`
  };

  return (
    <>
      {showModal && (
        <ReminderModal
          show={showModal}
          title="Time to reapply sunscreen! 🌞"
          message="Would you like to snooze or stop the reminder?"
          onSnooze={handleSnooze}
          onStop={handleStop}
        />
      )}
    </>
  );
};

export default ReminderChecker;
