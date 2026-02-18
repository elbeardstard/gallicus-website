import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle /admin/* paths before next-intl tries to localize them
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const token = request.cookies.get("admin_session")?.value;
    const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET ?? "");

    if (!isLoginPage) {
      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
      try {
        await jwtVerify(token, secret);
      } catch {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } else if (token) {
      try {
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/admin", request.url));
      } catch {
        /* invalid token — stay on login */
      }
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/admin/:path*",
  ],
};
