'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import UVIndexChart from '@/app/components/UVIndexChart';
import { setSkinTone } from "@/app/store/uvSlice";
import { useFetchRecommendations } from "@/app/store/hooks";


const personalization = () => {
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
            <div className="flex flex-col md:flex-row justify-between px-2 py-2 gap-4 md:gap-8 w-full items-center">
                {/* Left side image */}
                <div className="w-full md:w-[60%] max-w-[900px]">
                    <Image
                        src="/skin_tone.png"
                        alt="Skin tone categories"
                        width={500}
                        height={300}
                        className="w-full h-auto rounded-xl shadow-md"
                    />
                </div>

                {/* Right side selection box (vertical arrangement) */}
                <div className="h-full md:w-[45%] max-w-[500px] flex flex-col justify-between px-4 py-4 gap-4">
                    {/* Skin tone dropdown menu */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Skin Tone</label>
                        <select
                            value={skinTone || ""}
                            onChange={(e) => dispatch(setSkinTone(e.target.value))}
                            className="border px-3 py-2 rounded-md text-sm"
                        >
                            <option value="">Select skin tone</option>
                            <option value="Very fair">Very fair</option>
                            <option value="Fair">Fair</option>
                            <option value="Light brown">Light brown</option>
                            <option value="Moderate brown">Moderate brown</option>
                            <option value="Dark brown">Dark brown</option>
                            <option value="Deeply pigmented">Deeply pigmented</option>
                        </select>
                    </div>

                    {/* Location input box */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Location</label>
                        <input
                            type="text"
                            value={location}
                            readOnly // ✅ Controlled by Redux, manual modification prohibited
                            className="border px-3 py-2 rounded-md text-sm"
                            placeholder="Enter your city"
                        />
                    </div>
                </div>
            </div>

            {/* UV index circle & recommendation content & countdown */}
            <div className="flex h-1/2 w-full rounded-xl p-4 bg-gray-200 gap-4">
                <div className="flex-col items-center justify-center h-full w-1/3">
                    <div className="flex flex-col items-start w-full">
                        <p className="text-lg font-semibold text-purple-700">
                            {formattedDateTime}
                        </p>
                        <p className="text-sm text-gray-600">
                            {location || "Loading location..."}
                        </p>
                    </div>
                    <UVIndexChart />
                </div>

                {/* Recommendation information */}
                <div className="w-1/3 h-full bg-[#E0DBFA] flex flex-col items-center py-2">
                    <div className="h-full flex flex-col text-center items-center justify-center">
                        <div>
                            <h2 className="text-xl font-bold text-purple-900">
                                {isSafeToGoOut ? "You can go outside safely!" : "Avoid the sun!!"}
                            </h2>
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                            <ul className="mt-4 text-left list-disc list-inside text-black">
                                <li>{recommendation}</li>
                                <li>Reapply sunscreen every {reapplyTime} minutes.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Countdown & button */}
                <div className="w-1/3 h-full flex-1 flex flex-col justify-center items-center text-center">
                    <Image src="/timer.png" alt="timer" width={40} height={40} />
                    <p className="text-sm mt-2">You will need to reapply sunscreen in</p>
                    <p className="text-3xl font-bold text-orange-500 mt-2">
                        {nextReminderIn !== null ? `${nextReminderIn} mins` : "N/A"}
                    </p>
                    <button 
                        onClick={() => router.push("/pages/reminder")}
                        className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-md font-semibold">Set your reminder</button>
                </div>
            </div>

            {/* Facts section */}
            <div className="h-1/3 w-full border-t px-6 pt-4 text-sm">
                {/* Text part */}
                <div className="w-full text-center text-purple-900 font-bold text-lg mb-4">
                    Facts you need to know
                </div>

                {/* Image part */}
                <div className="flex justify-between gap-4">
                    {/* UV Rays image and text */}
                    <div className="flex flex-col items-center">
                        <Image src="/UVImpact.jpeg" alt="UV Rays" width={400} height={300} objectFit="cover" />
                        <div className="text-center mt-2">
                            <a href="https://healthmatch.io/blog/top-20-skin-cancer-hot-spots-in-the-world-and-why-theyre-on-the-list" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Different UV rays and their depth of impact on the skin
                            </a>
                        </div>
                    </div>

                    {/* Skin Cancer image and text */}
                    <div className="flex flex-col items-center">
                        <Image src="/skin_cancer.jpeg" alt="Skin Cancer" width={400} height={300} objectFit="cover" />
                        <div className="text-center mt-2">
                            <a href="https://www.spotscreen.com.au/info-centre/skin-cancer-information/skin-cancer-facts/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Key facts about skin cancer in Australia
                            </a>
                        </div>
                    </div>

                    {/* UV Danger image and text */}
                    <div className="flex flex-col items-center">
                        <Image src="/UVDanger.jpg" alt="UV Danger" width={400} height={300} objectFit="cover" />
                        <div className="text-center mt-2">
                            <a href="https://mieye.com/protecting-eyes-harmful-uv-rays/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                The danger of UV
                            </a>
                        </div>
                    </div>
                </div>
                {/* Learn more link */}
                <p className="mt-2 text-right text-sm text-blue-700 cursor-pointer">
                    <a href="https://www.cancer.org.au/cancer-information/causes-and-prevention/sun-safety" target="_blank" rel="noopener noreferrer" className="hover:underline">
                        &gt;&gt;&gt;Learn more about how to protect your skin
                    </a>
                </p>
            </div>

        </div >
    );
}

export default personalization;