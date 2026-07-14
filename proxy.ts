import { NextRequest, NextResponse } from "next/server";
const SESSION_COOKIE = "dubber_admin_session";
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  if (!hasSession) return NextResponse.redirect(new URL("/login", request.url));
  if (request.nextUrl.pathname === "/login") return NextResponse.redirect(new URL("/dashboard", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*", "/licenses/:path*", "/payments/:path*", "/discounts/:path*", "/customers/:path*", "/system/:path*"] };
