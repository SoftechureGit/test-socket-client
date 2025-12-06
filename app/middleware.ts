import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ROUTES = ["/chat", "/channels", "/messages"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (!PROTECTED_ROUTES.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/chat/:path*", "/channels/:path*", "/messages/:path*"],
};
