import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/projects", "/settings", "/onboarding"];
const adminPaths = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAdmin = adminPaths.some((p) => pathname.startsWith(p));

  if (!isProtected && !isAdmin) {
    return NextResponse.next();
  }

  const hasDevSession = request.cookies.has("viewcap_dev_session");
  const hasSupabaseSession = request.cookies
    .getAll()
    .some((c) => c.name.includes("supabase") || c.name.includes("sb-"));

  if (process.env.DEV_AUTH_ENABLED === "true" || hasDevSession || hasSupabaseSession) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/settings/:path*", "/onboarding", "/admin/:path*"],
};
