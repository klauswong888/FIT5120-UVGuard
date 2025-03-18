"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setReminder, stopReminder } from "@/app/store/reminderSlice";
import Cookies from "js-cookie";

// ✅ Form validation rules (Zod)
const reminderSchema = z.object({
  timing: z.string().min(1, "Please select a reminder time"),
  frequency: z
    .number({ invalid_type_error: "Frequency must be a number" })
    .min(1, "Frequency must be at least 1 minute"),
});

// ✅ Type for the reminder form
type ReminderFormType = z.infer<typeof reminderSchema>;

const ReminderForm = () => {
  const dispatch = useAppDispatch();
  const reminder = useAppSelector((state) => state.reminder);
  const nextReminderIn = useAppSelector(state => state.reminder.nextReminderIn);

  // ✅ React Hook Form + Zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReminderFormType>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      timing: "",
      frequency: 5,
    },
  });

  // ✅ Read Cookies and update form on component load
  useEffect(() => {
    const savedReminder = Cookies.get("reminder");
    if (savedReminder) {
      try {
        const parsedReminder: ReminderFormType = JSON.parse(savedReminder);
        setValue("timing", parsedReminder.timing);
        setValue("frequency", parsedReminder.frequency);
      } catch (error) {
        console.error("Failed to parse reminder from cookies:", error);
      }
    }
  }, [setValue]);

  // ✅ Handle form submission
  const onSubmit = (data: ReminderFormType) => {
    console.log("Dispatching setReminder with data:", data);
    dispatch(setReminder(data));
    Cookies.set("reminder", JSON.stringify(data), { expires: 7, path: "/" });
    console.log("Reminder set successfully!");
  };

  // ✅ Stop reminder
  const handleStop = () => {
    dispatch(stopReminder());
    Cookies.remove("reminder");
    setValue("timing", "");
    setValue("frequency", 5);
    console.log("Reminder stopped.");
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <h2 className="text-lg font-semibold text-center">Set Reminder 🔔</h2>

        {/* ⏰ Reminder Time */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Reminder Time:</label>
          <input
            type="time"
            className="border p-2 w-full rounded"
            {...register("timing")}
          />
          {errors.timing && <p className="text-red-500 text-sm">{errors.timing.message}</p>}
        </div>

        {/* 🔄 Frequency */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Reminder Frequency (minutes):</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            {...register("frequency", { valueAsNumber: true })}
          />
          {errors.frequency && <p className="text-red-500 text-sm">{errors.frequency.message}</p>}
        </div>

        {/* ✅ Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mb-2">
          {reminder.active ? "Update Reminder" : "Set Reminder"}
        </button>

        {/* 🛑 Stop Reminder Button */}
        <button
          type="button"
          onClick={handleStop}
          className={`p-2 rounded w-full ${
            reminder.active ? "bg-red-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={!reminder.active}
        >
          Stop Reminder
        </button>
      </form>
      <div className="h-1/3 flex flex-col justify-center items-center text-center">
          <p className="text-sm mt-2">You will need to reapply sunscreen in</p>
          <p className="text-3xl font-bold text-orange-500 mt-2">
              {nextReminderIn !== null ? `${nextReminderIn} mins` : "N/A"}
          </p>
      </div>
    </div>
  );
};

export default ReminderForm;
