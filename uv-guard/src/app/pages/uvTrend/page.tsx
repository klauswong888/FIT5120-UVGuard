'use client';
import UvTrendChart from "@/app/components/UVTrendChart";
import UVIndexChart from '@/app/components/UVIndexChart'
import { useState, useEffect } from "react";
import moment from "moment";


const DEFAULT_ADDRESS = "Melbourne, Australia";
const DEFAULT_LAT = -37.8136;
const DEFAULT_LNG = 144.9631;

const UvTrend = () => {
    const [location, setLocation] = useState(DEFAULT_ADDRESS);
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const [currentTime, setCurrentTime] = useState("");
    const [uvData, setUvData] = useState<{ time: string; uvIndex: number }[]>([]);
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
            fetchUVTrends(DEFAULT_LAT, DEFAULT_LNG, selectedDate, "Australia/Melbourne");
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

                // ✅ 直接查询 UV 数据
                fetchUVTrends(data.lat, data.lng, selectedDate, data.timezone);
            } else {
                alert("Location not found.");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        } finally {
            setLoading(false);
        }
    };

    /** 🌞 查询 UV 数据 */
    const fetchUVTrends = async (lat: number, lng: number, date: string, timezone: string) => {
        if (!lat || !lng || !timezone) {
            alert("Please select a valid location first.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/uv?lat=${lat}&lng=${lng}&date=${date}&timezone=${timezone}`);
            const data = await res.json();

            if (!data.error) {
                setUvData(formatUvData(data.uvData));
            } else {
                alert("Failed to fetch UV data.");
            }
        } catch (error) {
            console.error("Error fetching UV data:", error);
        } finally {
            setLoading(false);
        }
    };

    /** ⏳ 更新时间 */
    useEffect(() => {
        setCurrentTime(`${moment().format("HH:mm")}, ${moment(selectedDate).format("DD MMM YYYY")}`);
    }, [selectedDate]);

    /** 📊 格式化 UV 数据 */
    const formatUvData = (rawData: number[]) => {
        return rawData.map((value, index) => ({
            time: `${index}:00`, // X 轴：小时
            uvIndex: value,
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
          onClick={() => fetchLocationData(location)}
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
