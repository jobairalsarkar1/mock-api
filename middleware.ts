// export { auth as middleware } from "@/auth"
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

    // CORS handling for all API routes
  if (pathname.startsWith("/api")) {
    if (req.method === "OPTIONS") {
      const preflight = NextResponse.json({}, { status: 200 });
      preflight.headers.set("Access-Control-Allow-Origin", "*");
      preflight.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      preflight.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-API-KEY");
      return preflight;
    }

    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-API-KEY");
    return res;
  }
  
  const session = await auth();
  const publicPaths = ["/", "/docs", "/about", "/sign-in", "/unauthorized"];

  const protectedRoutes = ["/account", "/profile", "/settings"];

  const adminRoutes = ["/dashboard"];

  if (session && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  if (!session && protectedRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (adminRoutes.some(path => pathname.startsWith(path)) && session?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (publicPaths.some(path => pathname.startsWith(path)) || session) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/sign-in", req.url));
}


export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}