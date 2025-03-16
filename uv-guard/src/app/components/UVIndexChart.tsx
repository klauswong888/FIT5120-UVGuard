"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { useAppSelector } from "@/app/store/hooks";

const RADIAN = Math.PI / 180;

// UV color mapping (gradient)
const UV_COLORS = [
  { stop: "0%", color: "#00FF00" },   // 0-2 (Low) Green
  { stop: "25%", color: "#FFFF00" },  // 3-5 (Moderate) Yellow
  { stop: "50%", color: "#FFA500" },  // 6-7 (High) Orange
  { stop: "75%", color: "#FF4500" },  // 8-10 (Very High) Dark Orange
  { stop: "100%", color: "#FF0000" }, // 11+ (Extreme) Red
];

// UV Index semicircle component
const UVIndexChart = () => {
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const uvIndex = useAppSelector((state) => state.uv.uvIndex);

  const maxUV = 12; // Maximum UV index
  const cx = 170;
  const cy = 150;
  const iR = 80;
  const oR = 100;
  const dotSize = 16; // Indicator dot size

  // Calculate UV Cell data
  const data = [{ name: "UV Scale", value: maxUV }];

  // Calculate indicator dot position
  useEffect(() => {
    const angle = 180 * (1 - uvIndex / maxUV); // Calculate angle
    const radians = -RADIAN * angle; // Convert to radians
    const radius = (iR + oR) / 2; // Position the dot in the middle of the arc
    const x = cx + radius * Math.cos(radians);
    const y = cy + radius * Math.sin(radians);
    
    setDotPosition({ x, y });
  }, [uvIndex]);

  return (
    <div className="w-full h-[75%]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Define gradient */}
          <defs>
            <linearGradient id="uvGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              {UV_COLORS.map((stop, index) => (
                <stop key={index} offset={stop.stop} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>

          {/* Gradient semicircle UV color */}
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

          {/* Indicator dot enlarged and color fixed to white */}
          <circle cx={dotPosition.x} cy={dotPosition.y} r={dotSize} fill="#FFFFFF" stroke="none" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UVIndexChart;
