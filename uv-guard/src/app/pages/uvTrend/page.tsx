'use client';
import UvTrendChart from "@/app/components/UVTrendChart";
import UVIndexChart from '@/app/components/UVIndexChart'
import { useState, useEffect, useRef } from "react";
import moment from "moment-timezone"
import { useAppDispatch, useAppSelector, useFetchRecommendations } from "@/app/store/hooks";
import { setDate, setTime, setUVIndex, setLocation } from "@/app/store/uvSlice";
import { useRouter } from "next/navigation";


const DEFAULT_ADDRESS = "Melbourne, Australia";
const DEFAULT_LAT = -37.8136;
const DEFAULT_LNG = 144.9631;

const UvTrend = () => {

    useFetchRecommendations();
    const location = useAppSelector((state) => state.uv.location);
    const selectedDate = useAppSelector((state) => state.uv.date);
    const currentTime = useAppSelector((state) => state.uv.time);
    const [uvData, setUvData] = useState<{ time: string; uvIndex: number }[]>([]);
    const [loading, setLoading] = useState(false);
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const [timezone, setTimezone] = useState<string | null>(null);
    const [currentUV, setCurrentUV] = useState<number>(0);
    const [formattedDateTime, setFormattedDateTime] = useState("Loading...");
    const recommendation = useAppSelector(state => state.uv.recommendation);
    const isSafeToGoOut = useAppSelector(state => state.uv.isSafeToGoOut);

    const dispatch = useAppDispatch();
    const router = useRouter();

    /* Get user's geolocation on page load and automatically query UV data */
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLat(latitude);
                    setLng(longitude);

                    // Directly use lat/lng to call `/api/location`
                    await fetchLocationData(null, latitude, longitude);
                },
                async () => {
                    dispatch(setLocation(DEFAULT_ADDRESS));
                    setLat(DEFAULT_LAT);
                    setLng(DEFAULT_LNG);
                    await fetchLocationData(DEFAULT_ADDRESS);
                }
            );
        } else {
            dispatch(setLocation(DEFAULT_ADDRESS));
            setLat(DEFAULT_LAT);
            setLng(DEFAULT_LNG);
            fetchUVTrends(DEFAULT_LAT, DEFAULT_LNG, selectedDate, "Australia/Melbourne");
        }
    }, [dispatch]);

    /* Get lat/lng & timezone through coordinates/address, then query UV data */
    const fetchLocationData = async (address?: string | null, lat?: number, lng?: number) => {
        setLoading(true);
        try {
            const query = address
                ? `address=${encodeURIComponent(address)}`
                : `lat=${lat}&lng=${lng}`;

            const res = await fetch(`/api/location?${query}`);
            const data = await res.json();

            if (!data.error) {
                const address = typeof data.address === "string" ? data.address : DEFAULT_ADDRESS;
                dispatch(setLocation(address)); //  Now the API will also return `address`
                setLat(data.lat);
                setLng(data.lng);
                setTimezone(data.timezone);

                //  Directly query UV data
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

    /* Query UV data */
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
                const formattedData = formatUvData(data.uvData);
                setUvData(formattedData);
                const nowHour = moment().tz(timezone).hour();
                const currentUVIndex = formattedData.find((item) => parseInt(item.time.split(":")[0]) === nowHour);

                dispatch(setUVIndex(currentUVIndex ? currentUVIndex.uvIndex : 0));
            } else {
                alert("Failed to fetch UV data.");
            }
        } catch (error) {
            console.error("Error fetching UV data:", error);
        } finally {
            setLoading(false);
        }
    };

    /* Update time */
    useEffect(() => {
        const updateTime = () => {
            const validTimezone = timezone ?? "Australia/Melbourne";
            const now = moment().tz(validTimezone);
            const newTime = now.format("HH:mm");
            const newDate = now.format("YYYY-MM-DD");

            if (currentTime !== newTime) {
                dispatch(setTime(newTime));
            }
            if (selectedDate === newDate) {
                dispatch(setDate(newDate));
            }
        };
        updateTime();

        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, [timezone, selectedDate, dispatch, currentTime]);

    /* Format UV data */
    const formatUvData = (rawData: number[]) => {
        return rawData.map((value, index) => ({
            time: `${index}:00`, // X-axis: hour
            uvIndex: value,
        }));
    };

    /** 🌞 Monitor UV data & time, get current UV in real-time */
    useEffect(() => {
        if (!timezone || uvData.length === 0) return;

        const validTimezone = timezone ?? "Australia/Melbourne";
        const nowHour = moment().tz(validTimezone).hour(); // Get current hour (0-23)

        // Find the UV value corresponding to the current hour
        const currentUVIndex = uvData.find((item) => parseInt(item.time.split(":")[0]) === nowHour);

        dispatch(setUVIndex(currentUVIndex ? currentUVIndex.uvIndex : 0));

        setCurrentUV(currentUVIndex ? currentUVIndex.uvIndex : 0);
    }, [uvData, timezone, dispatch]);

    useEffect(() => {
        if (selectedDate && currentTime) {
            setFormattedDateTime(`${currentTime}, ${selectedDate}`);
        }
    }, [selectedDate, currentTime]);

    return (
        <div className="flex flex-col items-center h-full gap-6">
            <div className="flex items-center justify-between w-full gap-6 px-4">
                <div className="flex items-center text-center gap-15">
                    <div className="flex items-center text-center gap-8">
                        <label className="text-sm font-semibold">Current Location</label>
                        <input
                            type="text"
                            className="border rounded-md px-2 py-1 text-center"
                            placeholder="Enter location"
                            value={location}
                            onChange={(e) => dispatch(setLocation(e.target.value))}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && location.trim() !== "" && selectedDate) {
                                    fetchLocationData(location);
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center text-center gap-8">
                        <label className="text-sm font-semibold">Date</label>
                        <input
                            type="date"
                            className="border rounded-md px-2 py-1 text-center"
                            value={selectedDate}
                            onChange={(e) => {
                                dispatch(setDate(e.target.value));
                            }}
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
                <UvTrendChart uvData={uvData} />
            </div>
            <div className="flex h-1/2 w-full rounded-xl p-4 bg-gray-200 gap-4">
                <div className="flex-col items-center justify-center h-full w-1/2">
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col items-start">
                            <p className="text-lg font-semibold text-purple-700">
                                {formattedDateTime}
                            </p>
                            <p className="text-sm text-gray-600">
                                {location ? location : "Enter location above"}
                            </p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-lg font-semibold text-purple-700">
                                Current UV:{currentUV}
                            </p>
                        </div>
                    </div>
                    <UVIndexChart />
                </div>
                <div className="w-1/2 h-full bg-[#E0DBFA] flex flex-col items-center py-2">
                    <div className="h-full flex flex-col text-center items-center justify-center">
                        <div>
                            <h2 className="text-xl font-bold text-purple-900">
                                {isSafeToGoOut ? "You can go outside safely!" : "Avoid the sun!!"}
                            </h2>
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                            <ul className="mt-4 text-left list-disc list-inside text-black">
                                <li>{recommendation}</li>
                            </ul>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push("/pages/personalization")}
                        className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-purple-700 transition">
                        See your personalized solutions
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UvTrend;
