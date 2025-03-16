'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UVIndexChart from '@/app/components/UVIndexChart'
import moment from "moment-timezone"

const DEFAULT_ADDRESS = "Melbourne, Australia";
const DEFAULT_LAT = -37.8136;
const DEFAULT_LNG = 144.9631;

const personalization = () => {
    const [skinTone, setSkinTone] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const [countdown, setCountdown] = useState(28);
    const router = useRouter();
    const [currentTime, setCurrentTime] = useState("");
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const [loading, setLoading] = useState(false);
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const [timezone, setTimezone] = useState<string | null>(null);

    /** 🚀 页面加载时获取用户地理位置，并自动查询 UV 数据 */
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLat(latitude);
                    setLng(longitude);

                    // ✅ 直接用 lat/lng 调用 `/api/location`
                    await fetchLocationData(null, latitude, longitude);
                },
                async () => {
                    console.warn("User denied location access, using default.");
                    setLocation(DEFAULT_ADDRESS);
                    setLat(DEFAULT_LAT);
                    setLng(DEFAULT_LNG);
                    await fetchLocationData(DEFAULT_ADDRESS);
                }
            );
        } else {
            console.warn("Geolocation not supported, using default location.");
            setLocation(DEFAULT_ADDRESS);
            setLat(DEFAULT_LAT);
            setLng(DEFAULT_LNG);
        }
    }, []);

    /** 📌 通过坐标/地址获取 lat/lng & timezone，然后查询 UV 数据 */
    const fetchLocationData = async (address?: string | null, lat?: number, lng?: number) => {
        setLoading(true);
        try {
            const query = address
                ? `address=${encodeURIComponent(address)}`
                : `lat=${lat}&lng=${lng}`;

            const res = await fetch(`/api/location?${query}`);
            const data = await res.json();

            if (!data.error) {
                setLocation(data.address || DEFAULT_ADDRESS); // ✅ 现在 API 也会返回 `address`
                setLat(data.lat);
                setLng(data.lng);
                setTimezone(data.timezone);
            } else {
                alert("Location not found.");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        } finally {
            setLoading(false);
        }
    };

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
            <div className="w-full border-t px-6 pt-4 text-sm">
                {/* 文字部分 */}
                <div className="w-full text-center text-purple-900 font-bold text-lg mb-4">
                    Facts you need to know
                </div>

                {/* 图片部分 */}
                <div className="flex justify-between gap-4">
                    {/* UV Rays 图片和文字 */}
                    <div className="flex flex-col items-center">
                        <Image src="/UVImpact.jpeg" alt="UV Rays" width={400} height={300} objectFit="cover" />
                        <div className="text-center mt-2">
                            <a href="https://healthmatch.io/blog/top-20-skin-cancer-hot-spots-in-the-world-and-why-theyre-on-the-list" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Different UV rays and their depth of impact on the skin
                            </a>
                        </div>
                    </div>

                    {/* Skin Cancer 图片和文字 */}
                    <div className="flex flex-col items-center">
                        <Image src="/skin_cancer.jpeg" alt="Skin Cancer" width={400} height={300} objectFit="cover" />
                        <div className="text-center mt-2">
                            <a href="https://www.spotscreen.com.au/info-centre/skin-cancer-information/skin-cancer-facts/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Key facts about skin cancer in Australia
                            </a>
                        </div>
                    </div>

                    {/* UV Danger 图片和文字 */}
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