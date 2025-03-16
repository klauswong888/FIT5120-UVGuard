import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_KEY; 

// Get latitude and longitude from address using Google API
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

// Get timezone using Google API
const fetchTimeZone = async (lat: number, lng: number) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.timeZoneId || "UTC";
};

// Get address from latitude and longitude using Google API
const fetchAddressFromCoords = async (lat: number, lng: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.status === "OK" && data.results.length > 0) {
    return data.results[0].formatted_address;
  }
  return null;
};

// Handle API request
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  let coordinates = null;
  let resolvedAddress = address || "Unknown location";

  if (address) {
    coordinates = await fetchCoordinates(address);
    if (!coordinates) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }
  } else if (lat && lng) {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    resolvedAddress = await fetchAddressFromCoords(latNum, lngNum) || "Unknown location";
    coordinates = { lat: latNum, lng: lngNum };
  } else {
    return NextResponse.json({ error: "Missing address or coordinates" }, { status: 400 });
  }

  // Ensure coordinates exist
  if (!coordinates) {
    return NextResponse.json({ error: "Invalid location data" }, { status: 400 });
  }

  const timezone = await fetchTimeZone(coordinates.lat, coordinates.lng);

  return NextResponse.json({
    address: resolvedAddress,
    lat: coordinates.lat,
    lng: coordinates.lng,
    timezone,
  });
}
