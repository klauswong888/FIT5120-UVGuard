'use client';
import UVProtectionTable from '@/app/components/UVProtectionTable';
import React from "react";
import { PiSunglassesBold, PiBaseballCapFill } from "react-icons/pi";
import { FaBottleDroplet, FaHouse } from "react-icons/fa6";
import { FaTshirt, FaUmbrella } from "react-icons/fa";
import { GiTreehouse } from "react-icons/gi";

const uvTableConfig = {
  columns: [
    { key: "sunglasses", label: "Use UV Blocking Sunglasses", icon: React.createElement(PiSunglassesBold, { className: "text-2xl text-purple-600" }) },
    { key: "sunscreen", label: "Wear Sunscreen", icon: React.createElement(FaBottleDroplet, { className: "text-2xl text-yellow-500" }) },
    { key: "hat", label: "Wear a Hat", icon: React.createElement(PiBaseballCapFill, { className: "text-2xl text-brown-600" }) },
    { key: "clothing", label: "Wear Protective Clothing", icon: React.createElement(FaTshirt, { className: "text-2xl text-blue-600" }) },
    { key: "shade", label: "Stay in Shade Near Midday", icon: React.createElement(GiTreehouse, { className: "text-2xl text-green-500" }) },
    { key: "reduce_sun", label: "Reduce Time in the Sun", icon: React.createElement(FaUmbrella, { className: "text-2xl text-red-500" }) },
    { key: "avoid_sun", label: "Avoid the Sun Between 10am-2pm", icon: React.createElement(FaHouse, { className: "text-2xl text-gray-700" }) },
  ],
  rows: [
    { key: "low", label: "1-2 (Low)" },
    { key: "moderate", label: "3-5 (Moderate)" },
    { key: "high", label: "6-7 (High)" },
    { key: "very_high", label: "8-10 (Very High)" },
    { key: "extreme", label: "11+ (Extreme)" },
  ],
};

const uvProtectionData = {
  low: { sunglasses: true, sunscreen: true, hat: true, clothing: true, shade: false, reduce_sun: false, avoid_sun: false },
  moderate: { sunglasses: true, sunscreen: true, hat: true, clothing: true, shade: false, reduce_sun: false, avoid_sun: false },
  high: { sunglasses: true, sunscreen: true, hat: true, clothing: true, shade: true, reduce_sun: false, avoid_sun: false },
  very_high: { sunglasses: true, sunscreen: true, hat: true, clothing: true, shade: true, reduce_sun: true, avoid_sun: false },
  extreme: { sunglasses: true, sunscreen: true, hat: true, clothing: true, shade: true, reduce_sun: true, avoid_sun: true },
};


const Products = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <UVProtectionTable config={uvTableConfig} data={uvProtectionData} />
    </div>
  )
}

export default Products;