import { NextResponse } from "next/server";

const GOOGLE_API_KEY = "AIzaSyDG4hXMudTXhFGFs3BLiMxtPwH86hwa5ZY"; 

// 通过 Google API 获取地址的经纬度
const fetchCoordinates = async (address: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status === "OK" && data.results.length > 0) {
    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  }
  return null;
};

// 通过 Google API 获取时区
const fetchTimeZone = async (lat: number, lng: number) => {
  const timestamp = Math.floor(Date.now() / 1000); // 当前时间戳
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.timeZoneId || "UTC";
};

// 处理 API 请求
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  const coordinates = await fetchCoordinates(address);
  if (!coordinates) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  const timezone = await fetchTimeZone(coordinates.lat, coordinates.lng);

  return NextResponse.json({
    address,
    lat: coordinates.lat,
    lng: coordinates.lng,
    timezone,
  });
}
