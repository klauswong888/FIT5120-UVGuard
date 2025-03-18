'use client';
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
// import UVIndexChart from "./components/UVIndexChart";

const UVIndexChart = dynamic(() => import("./components/UVIndexChart"), {
  ssr: false, // Disable server-side rendering (SSR)
});

export default function Home() {
  const router = useRouter();

  return (
      <div className="flex flex-col max-[1024px] items-center justify-center h-full gap-6">
        {/* Top purple information bar */}
        <div className="flex flex-col items-center justify-center w-full h-2/5 bg-[#533C9F] text-white text-center py-2 px-6 gap-8">
          <p className="text-2xl font-semibold">
            We created this platform for people like you
          </p>
          <p className="text-2xl font-semibold">—those who are concerned about UV exposure and the risk of Vitamin D deficiency.</p>
        </div>
        {/* Middle prompt */}
        <div className="flex items-center justify-center w-full h-1/5 text-center py-4 text-lg font-semibold text-[#533C9F]">
          Stay informed, stay protected, and make sun safety a habit!
        </div>
        {/* UV index recommendation card */}
        <div className="w-full h-2/5 bg-[#E0DBFA] text-center flex items-center gap-4 shadow-md">
          <div className="flex-1/3 flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-purple-900">
              UV radiation is invisible
            </h2>
            <h2 className="text-2xl font-bold text-purple-900">
              and
            </h2>
            <h2 className="text-2xl font-bold text-purple-900">
              undetectable by touch.
            </h2>
          </div>
          {/* Semi-circle UV protection recommendation */}
          <div className="flex-1/3 flex items-center justify-center h-full w-full">
            <UVIndexChart />
          </div>
          {/* Button */}
          <div className="flex-1/3 flex items-end justify-end h-full py-4 px-3">
            <button
              onClick={() => router.push("/pages/uvTrend")}
              className="bg-[#063490] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#063490] transition">
              Check UV levels based on your location
            </button>
          </div>
        </div>
        
      </div>
  );
}
