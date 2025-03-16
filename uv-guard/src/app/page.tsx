'use client';
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import PasswordProtect from "@/app/components/PasswordProtect";
// import UVIndexChart from "./components/UVIndexChart";

const UVIndexChart = dynamic(() => import("./components/UVIndexChart"), {
  ssr: false, // Disable server-side rendering (SSR)
});

export default function Home() {
  const router = useRouter();

  return (
    <PasswordProtect>
      <div className="flex flex-col max-[1024px] items-center justify-center h-full gap-6">
        {/* Top purple information bar */}
        <div className="flex items-center justify-center w-full h-1/5 bg-[#533C9F] text-white text-center py-4 px-6">
          <p className="text-lg font-semibold">
            We created this platform for people like you—those who are concerned about UV exposure and the risk of Vitamin D deficiency.
          </p>
        </div>
        {/* Middle prompt */}
        <div className="w-full text-center py-4 text-lg font-semibold text-[#533C9F]">
          Stay informed, stay protected, and make sun safety a habit!
        </div>
        {/* UV index recommendation card */}
        <div className="w-full h-1/3 bg-[#E0DBFA] text-center flex items-center gap-4 shadow-md">
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
        <div className="w-full h-1/3 bg-[#FDE1BF] text-center flex items-center gap-4 shadow-md">
          {/* Left image */}
          <div className="relative w-1/4 h-full">
            <Image
              src="/homePage.png"
              alt="Skin Protection"
              fill
              className="object-fit"
            />
          </div>
          {/* Text content */}
          <div className="flex-1/2 text-center">
            <h2 className="text-2xl font-bold text-[#063490]">
              Choose the right sun protection for your skin tone early
            </h2>
            <p className="text-xl font-semibold text-[#063490] mt-2">
              — protect yourself, prevent skin cancer!
            </p>
          </div>
          {/* Right button */}
          <div className="flex-1/4 flex items-end justify-end h-full py-4 px-3">
            <button
              onClick={() => router.push("/pages/personalization")}
              className="bg-[#063490] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#063490] transition">
              Check your skin tones
            </button>
          </div>
        </div>
      </div>
    </PasswordProtect>
  );
}
