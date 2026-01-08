import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Allow public routes & static files
  if (
    PUBLIC_ROUTES.some(route => pathname.startsWith(route)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt")
  ) {
    return NextResponse.next();
  }

  // ✅ Read token from cookies
  const token = req.cookies.get("access_token")?.value;

  // ✅ Debug cookies (safe)
  console.log("=== Cookies ===");
  req.cookies.getAll().forEach(c => console.log(`${c.name} = ${c.value}`));
  console.log("===============");

  // ❌ No token → redirect / 401
  if (!token) {
    return pathname.startsWith("/api")
      ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      : NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ Verify JWT
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!)
    );

    // ✅ Token valid
    return NextResponse.next();
  } catch (error) {
    console.log("JWT verification failed:", error);

    // ❗ IMPORTANT: DO NOT delete cookie here
    return pathname.startsWith("/api")
      ? NextResponse.json({ error: "Invalid token" }, { status: 401 })
      : NextResponse.redirect(new URL("/login", req.url));
  }
}

// ✅ Middleware matcher
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
