"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;

// ✅ 定义数据类型
interface PieData {
  name: string;
  value: number;
}

// ✅ 定义组件 Props 类型
interface DotIndicatorProps {
  value: number; // UV 指数
  data: PieData[]; // 数据数组
  cx: number; // 圆心 X 坐标
  cy: number; // 圆心 Y 坐标
  iR: number; // 内半径
  oR: number; // 外半径
  color: string; // 指示点颜色
}

// ✅ dotIndicator 函数定义（指示点计算）
const dotIndicator = ({ value, data, cx, cy, iR, oR, color }: DotIndicatorProps) => {
  let total = data.reduce((sum, item) => sum + item.value, 0); // 计算总和

  // 计算指示点的角度
  const ang = 180.0 * (1 - value / total);
  const radians = -RADIAN * ang; // 转换为弧度

  // 计算指示点的位置
  const radius = (iR + oR) / 2; // 让点落在弧的中间
  const x = cx + radius * Math.cos(radians);
  const y = cy + radius * Math.sin(radians);

  return <circle cx={x} cy={y} r={20} fill={color} stroke="none" />;
};

const data: PieData[] = [
  { name: "A", value: 80 },
];

const cx = 170;
const cy = 150;
const iR = 80;
const oR = 100;
const value = 50;

const UVIndexChart = () => {
    return (
      <div className="w-full h-[75%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
          <defs>
            <radialGradient id="gradientColor" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9D00" />
              <stop offset="100%" stopColor="#FFA500" />
            </radialGradient>
          </defs>
          <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx={cx}
              cy={cy}
              innerRadius={iR}
              outerRadius={oR}
              // fill="url(#gradientColor)"
              stroke="none"
          >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="url(#gradientColor)" />
              ))}
          </Pie>
          {dotIndicator({ value, data, cx, cy, iR, oR, color: "#FFFFFF" })}
        </PieChart>
        </ResponsiveContainer>
      </div>
    );
}

export default UVIndexChart;