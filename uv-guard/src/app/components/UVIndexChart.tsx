"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { useAppSelector } from "@/app/store/hooks";

const RADIAN = Math.PI / 180;

// ✅ UV 颜色映射（渐变色）
const UV_COLORS = [
  { stop: "0%", color: "#00FF00" },   // 0-2 (低) 绿色
  { stop: "25%", color: "#FFFF00" },  // 3-5 (中) 黄色
  { stop: "50%", color: "#FFA500" },  // 6-7 (高) 橙色
  { stop: "75%", color: "#FF4500" },  // 8-10 (非常高) 深橙
  { stop: "100%", color: "#FF0000" }, // 11+ (极端) 红色
];

// ✅ UV Index 组件 Props
interface UVIndexChartProps {
  uvIndex: number; // 当前 UV 指数
}

// ✅ UV Index 半圆组件
const UVIndexChart = () => {
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const uvIndex = useAppSelector((state) => state.uv.uvIndex);

  const maxUV = 12; // 最大 UV 指数
  const cx = 170;
  const cy = 150;
  const iR = 80;
  const oR = 100;
  const dotSize = 16; // 指示点大小

  // ✅ 计算 UV Cell 数据
  const data = [{ name: "UV Scale", value: maxUV }];

  // **计算指示点位置**
  useEffect(() => {
    const angle = 180 * (1 - uvIndex / maxUV); // 计算角度
    const radians = -RADIAN * angle; // 转换为弧度
    const radius = (iR + oR) / 2; // 让点落在弧的中间
    const x = cx + radius * Math.cos(radians);
    const y = cy + radius * Math.sin(radians);
    
    setDotPosition({ x, y });
  }, [uvIndex]);

  return (
    <div className="w-full h-[75%]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* ✅ 定义渐变色 */}
          <defs>
            <linearGradient id="uvGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              {UV_COLORS.map((stop, index) => (
                <stop key={index} offset={stop.stop} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>

          {/* ✅ 渐变半圆 UV 颜色 */}
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            stroke="none"
            fill="url(#uvGradient)"
          />

          {/* ✅ 指示点 (dot) 放大且颜色固定白色 */}
          <circle cx={dotPosition.x} cy={dotPosition.y} r={dotSize} fill="#FFFFFF" stroke="none" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UVIndexChart;
