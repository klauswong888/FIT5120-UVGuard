import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-col max-[1024px] items-center justify-center h-full gap-2">
      {/* 顶部紫色信息栏 */}
      <div className="w-full bg-[#533C9F] text-white text-center py-4 px-6">
        <p className="text-lg font-semibold">
          We created this platform for people like you—those who are concerned about UV exposure and the risk of Vitamin D deficiency.
        </p>
      </div>
      {/* 中间提示语 */}
      <div className="w-full text-center py-4 text-lg font-semibold text-[#533C9F]">
        Stay informed, stay protected, and make sun safety a habit!
      </div>
      {/* UV 指数推荐卡片 */}
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
        {/* 半圆 UV 保护推荐 */}
        <div className="flex-1/3">
        </div>
        {/* 按钮 */}
        <div className="flex-1/3 flex items-end h-full py-4">
          <button className="bg-[#063490] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#063490] transition">
            Check UV levels based on your location
          </button>
        </div>
      </div>
    </div>
  );
}
