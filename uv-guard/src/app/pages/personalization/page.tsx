'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import UVIndexChart from '@/app/components/UVIndexChart';
import { setSkinTone } from "@/app/store/uvSlice";
import { useFetchRecommendations } from "@/app/store/hooks";


const Personalization = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    useFetchRecommendations();

    // ✅ Read state from Redux
    const { skinTone, recommendation, isSafeToGoOut, reapplyTime } = useAppSelector(state => state.uv);
    const location = useAppSelector(state => state.uv.location);
    const selectedDate = useAppSelector(state => state.uv.date);
    const currentTime = useAppSelector(state => state.uv.time);
    const nextReminderIn = useAppSelector(state => state.reminder.nextReminderIn);
    const [formattedDateTime, setFormattedDateTime] = useState("Loading...");
    const uvIndex = useAppSelector((state) => state.uv.uvIndex);


    useEffect(() => {
        if (selectedDate && currentTime) {
            setFormattedDateTime(`${currentTime}, ${selectedDate}`);
        }
    }, [selectedDate, currentTime]);

    useEffect(() => {
        console.log("Redux Skin Tone:", skinTone);
    }, [skinTone]);

    return (
        <div className="flex flex-col items-center h-full gap-6">
            {/* Skin tone image + dropdown selection area */}
            <div className="flex flex-col md:flex-row justify-between px-2 py-2 gap-4 md:gap-8 w-full items-center h-[30%]">
                {/* Left side image */}
                <div className="h-full md:w-[45%] max-w-[500px] flex flex-col justify-between px-4 py-4 gap-4">
                    {/* Location input box */}
                    <div className="flex flex-col">
                        <div className="text-xl font-semibold mb-1">Your Current Location:</div>
                        <div
                            className="px-3 py-2 text-lg"
                        >
                            {location}
                        </div>
                    </div>
                    {/* Skin tone dropdown menu */}
                    <div className="flex flex-col">
                        <label className="text-xl font-semibold mb-1">Skin Tone</label>
                        <select
                            value={skinTone || ""}
                            onChange={(e) => dispatch(setSkinTone(e.target.value))}
                            className="border px-3 py-2 rounded-md text-sm"
                        >
                            <option value="">Select your skin tone</option>
                            <option value="Very fair">Very fair</option>
                            <option value="Fair">Fair</option>
                            <option value="Light brown">Light brown</option>
                            <option value="Moderate brown">Moderate brown</option>
                            <option value="Dark brown">Dark brown</option>
                            <option value="Deeply pigmented">Deeply pigmented</option>
                        </select>
                    </div>
                </div>
                {/* SKin tone checker */}
                <div className="w-full md:w-[60%] max-w-[600px]">
                    <label className="block w-full text-center text-large font-semibold mb-3">Check your skin tone</label>
                    <Image
                        src="/skin_tone.png"
                        alt="Skin tone categories"
                        width={500}
                        height={300}
                        className="w-full h-auto rounded-xl shadow-md"
                    />
                </div>
            </div>

            {/* UV index circle & recommendation content */}
            <div className="flex w-full h-[50%] max-h-[50vh] rounded-xl p-4 justify-between bg-gray-200 gap-4">
                {/* UV index */}
                <div className="w-1/2 flex flex-col items-start justify-start h-full">
                    <div className="flex w-full justify-start mb-2">
                        <div className="flex flex-col mr-20">
                            <p className="text-lg font-semibold text-purple-700">{formattedDateTime}</p>
                            <p className="text-sm text-gray-600">{location || "Loading location..."}</p>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <p className="text-xl font-bold text-purple-900">Current UV index: {uvIndex}</p>
                        </div>
                    </div>
                    <UVIndexChart />
                </div>

                {/* Recommendation */}
                <div className="w-1/2 h-full bg-[#E0DBFA] flex flex-col items-center justify-center p-4 rounded-xl">
                    <h2 className="text-2xl font-bold text-purple-900 mb-4">
                        {isSafeToGoOut ? "You can go outside safely!" : "Avoid the sun!!"}
                    </h2>
                    <ul className="text-left list-disc list-inside text-black space-y-2">
                        <li>{recommendation}</li>
                        <li>Reapply sunscreen every {reapplyTime} minutes.</li>
                    </ul>
                </div>
            </div>

            {/* Countdown section */}
            <div className="w-full flex flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md gap-4 h-[20%]">
                {/* Icon */}
                <div className="w-1/4 flex items-center justify-center">
                    <Image src="/timer.png" alt="timer" width={40} height={40} />
                </div>

                {/* Text */}
                <div className="w-1/4 text-center">
                    <p className="text-sm font-semibold">You will need to reapply sunscreen in</p>
                    <p className="text-2xl md:text-3xl font-bold text-orange-500 mt-1">
                        {nextReminderIn !== null ? `${nextReminderIn} mins` : "N/A Minutes"}
                    </p>
                </div>

                {/* Button */}
                <div className="w-1/2 flex items-center justify-center">
                    <button
                        onClick={() => router.push("/pages/reminder")}
                        className="bg-purple-700 text-white px-30 py-4 rounded-md font-semibold text-lg w-full md:w-auto"
                    >
                        Set your reminder
                    </button>
                </div>
            </div>


        </div >
    );
}

export default Personalization;