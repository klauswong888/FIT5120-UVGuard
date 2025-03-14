'use client';
import UvTrendChart from "@/app/components/UVTrendChart";
import UVIndexChart from '@/app/components/UVIndexChart'
import { useState, useEffect } from "react";
import moment from "moment";

const DEFAULT_ADDRESS = "Melbourne, Australia"; 
const UvTrend = () => { 
    const [location, setLocation] = useState(DEFAULT_ADDRESS);
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD")); 
    const [currentTime, setCurrentTime] = useState("");
    const [uvData, setUvData] = useState<{ time: string; uvIndex: number }[]>([]);
    const [loading, setLoading] = useState(false);
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const [timezone, setTimezone] = useState<string | null>(null);

    // **获取用户地理位置**
    useEffect(() => {
        if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLng(longitude);

            // **调用后端 API 获取地址 + 时区**
            const res = await fetch(`/api/location?lat=${latitude}&lng=${longitude}`);
            const data = await res.json();

            if (!data.error) {
                setLocation(data.address || DEFAULT_ADDRESS); // ✅ 使用默认地址作为后备
                setTimezone(data.timezone);
                fetchUVTrends(data.address || DEFAULT_ADDRESS, latitude, longitude, selectedDate);
            } else {
                setLocation(DEFAULT_ADDRESS);
                fetchUVTrends(DEFAULT_ADDRESS, latitude, longitude, selectedDate);
            }
            },
            (error) => {
            console.error("Geolocation error:", error);
            setLocation(DEFAULT_ADDRESS); // ✅ 位置获取失败时使用默认地址
            fetchUVTrends(DEFAULT_ADDRESS, -37.8136, 144.9631, selectedDate); // Melbourne 坐标
            }
        );
        } else {
        alert("Geolocation is not supported by this browser.");
        setLocation(DEFAULT_ADDRESS);
        fetchUVTrends(DEFAULT_ADDRESS, -37.8136, 144.9631, selectedDate);
        }
    }, []);

    // 更新时间
    useEffect(() => {
        setCurrentTime(`${moment().format("HH:mm")}, ${moment(selectedDate).format("DD MMM YYYY")}`);
    }, [selectedDate]);

    // **查询 UV 数据**
    const fetchUVTrends = async (address: string, lat: number, lng: number, date: string) => {
        setLoading(true);
        try {
        const uvRes = await fetch(`/api/uv?lat=${lat}&lng=${lng}&date=${date}`);
        const uvData = await uvRes.json();

        if (!uvData.error) {
            setUvData(formatUvData(uvData.uvData));
        }
        } catch (error) {
        console.error("Error fetching UV data:", error);
        alert("Failed to fetch data");
        } finally {
        setLoading(false);
        }
    };
    // **格式化 UV 数据**
    const formatUvData = (rawData: number[]) => {
        return rawData.map((value, index) => ({
        time: `${index}:00`, // X 轴：小时
        uvIndex: value,      // Y 轴：UV 指数
        }));
    };

  return (
    <div className="flex flex-col items-center h-full gap-6">
      <div className="flex items-center justify-between w-full gap-6 px-4">
        <div className="flex items-center text-center gap-15">
          <div className="flex items-center text-center gap-8">
            <label className="text-sm font-semibold">Location</label>
            <input 
                type="text" 
                className="border rounded-md px-2 py-1 text-center" 
                placeholder="Enter location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex items-center text-center gap-8">
            <label className="text-sm font-semibold">Date</label>
            <input
                type="date"
                className="border rounded-md px-2 py-1 text-center"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-md"
          onClick={() => fetchUVTrends(location, lat!, lng!, selectedDate)}
          disabled={loading}
        >
          {loading ? "Loading..." : "View UV trends"}
        </button>
      </div>
      <div className=" h-1/2 w-full">
        <UvTrendChart uvData={uvData}/>
      </div>
      <div className="flex h-1/2 w-full rounded-xl p-4 bg-gray-200 gap-4">
        <div className="flex-col items-center justify-center h-full w-1/2">
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
        <div className="w-1/2 h-full bg-[#E0DBFA] flex flex-col items-center py-2">
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
            <button className="bg-[#063490] text-white font-semibold px-2 py-2 rounded-lg hover:bg-[#063490] transition">
                See your personalized solutions
            </button>
        </div>
      </div>
    </div>
  );
}

export default UvTrend;
