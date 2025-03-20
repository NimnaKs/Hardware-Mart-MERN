import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  // Get token from Authorization header instead of cookies
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : localStorage.getItem("token") || "";

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  // For client-side routes, we'll handle auth in the components
  // This middleware will primarily protect API routes
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyJwtToken(token);

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
