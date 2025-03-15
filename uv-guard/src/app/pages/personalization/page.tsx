'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UVIndexChart from '@/app/components/UVIndexChart'


const personalization = () => {
    const [skinTone, setSkinTone] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [countdown, setCountdown] = useState(28);
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");

    return (
        <div className="flex flex-col items-center h-full gap-6">
            {/* Skin tone 图片 + 下拉选择区域 */}
            <div className="flex flex-col md:flex-row justify-between px-2 py-2 gap-4 md:gap-8 w-full items-center">
                {/* 左侧图片 */}
                <div className="w-full md:w-[60%] max-w-[900px]">
                    <Image
                        src="/skin_tone.png"
                        alt="Skin tone categories"
                        width={500}
                        height={300}
                        className="w-full h-auto rounded-xl shadow-md"
                    />
                </div>

                {/* 右侧选择框（垂直排列） */}
                <div className="h-full md:w-[45%] max-w-[500px] flex flex-col justify-between px-4 py-4 gap-4">
                    {/* Skin tone 下拉菜单 */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Skin Tone</label>
                        <select
                            value={skinTone}
                            onChange={(e) => setSkinTone(e.target.value)}
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

                    {/* Location 输入框 */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border px-3 py-2 rounded-md text-sm"
                            placeholder="Enter your city"
                        />
                    </div>
                </div>
            </div>

            {/* UV index 圆环 & 建议内容 & 倒计时 */}
            <div className="flex h-1/2 w-full rounded-xl p-4 bg-gray-200 gap-4">
                <div className="flex-col items-center justify-center h-full w-1/3">
                    <div className="flex flex-col items-start w-full">
                        <p className="text-lg font-semibold text-purple-700">
                            {currentTime}
                        </p>
                        <p className="text-sm text-gray-600">
                            {location ? location : "Enter location above"}
                        </p>
                    </div>
                    <UVIndexChart />
                </div>

                {/* 建议信息 */}
                <div className="w-1/3 h-full bg-[#E0DBFA] flex flex-col items-center py-2">
                    <div className="h-full flex flex-col text-center items-center justify-center">
                        <div>
                            <h2 className="text-xl font-bold text-purple-900">
                                AVOID THE SUN!!
                            </h2>
                            <h2 className="text-xl font-bold text-purple-900">
                                It is NOT a good time to go out
                            </h2>
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                            <ul className="mt-4 text-left list-disc list-inside text-black">
                                <li>Apply SPF 50+ sunscreen</li>
                                <li>Wear sunglasses</li>
                                <li>Wear protective clothing</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 倒计时 & 按钮 */}
                <div className="w-1/3 h-full flex-1 flex flex-col justify-center items-center text-center">
                    <Image src="/timer.png" alt="timer" width={40} height={40} />
                    <p className="text-sm mt-2">You will need to reapply sunscreen in</p>
                    <p className="text-3xl font-bold text-orange-500 mt-2">{countdown} mins</p>
                    <button className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-md font-semibold">Set your reminder</button>
                </div>
            </div>

            {/* Facts section */}
            <div className="border-t px-6 pt-4 text-sm">
                <div className="text-purple-900 font-bold text-lg mb-2">Facts you need to know</div>
                <div className="flex gap-4 overflow-x-auto">
                    {/* <Image src="/uv_rays.png" alt="UV Rays" width={150} height={100} />
                    <Image src="/skin_cancer_facts.png" alt="Skin Cancer" width={150} height={100} />
                    <Image src="/uv_danger.png" alt="UV Danger" width={150} height={100} /> */}
                </div>
                <p className="mt-2 text-right text-sm text-blue-700 cursor-pointer">&gt;&gt;&gt;Learn more about how to protect your skin</p>
            </div>
        </div >
    );
}

export default personalization;