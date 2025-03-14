'use client';
import UvTrendChart from "@/app/components/UVTrendChart";
import UVIndexChart from '@/app/components/UVIndexChart'
import { useState, useEffect } from "react";
import moment from "moment";


const UvTrend = () => { 
    const [location, setLocation] = useState("");
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD")); 
    const [currentTime, setCurrentTime] = useState("");
    useEffect(() => {
        const now = moment().format("HH:mm"); 
        setCurrentTime(`${now}, ${moment(selectedDate).format("DD MMM YYYY")}`);
    }, [selectedDate]);
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
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md">View UV trends</button>
      </div>
      <div className=" h-1/2 w-full">
        <UvTrendChart/>
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
