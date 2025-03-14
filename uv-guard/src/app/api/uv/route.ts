import { NextResponse } from "next/server";

// 获取时区信息
const fetchTimeZone = async (lat: number, lng: number) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/timezone?latitude=${lat}&longitude=${lng}`
  );
  const data = await res.json();
  return data.timezone || "UTC";
};

// 获取 UV 指数
const fetchUVData = async (lat: number, lng: number, date: string, timezone: string) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=uv_index&timezone=${timezone}&start_date=${date}&end_date=${date}`
  );
  const data = await res.json();
  return data.hourly.uv_index; // 每小时的 UV 值
};

// 处理 GET 请求
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing lat or lng" }, { status: 400 });
  }

  const timezone = await fetchTimeZone(lat, lng);
  const uvData = await fetchUVData(lat, lng, date, timezone);

  return NextResponse.json({ lat, lng, date, timezone, uvData });
}
