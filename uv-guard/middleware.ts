import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const auth = req.headers.get("authorization");

    const USERNAME = process.env.AUTH_USERNAME || "admin";
    const PASSWORD = process.env.AUTH_PASSWORD || "123456";
    const encoded = Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64");

    if (!auth || auth !== `Basic ${encoded}`) {
        return new NextResponse("Authentication required", {
            status: 401,
            headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/:path*",
};
