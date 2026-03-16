import { NextResponse } from "next/server";
import { auth } from "./src/auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = Boolean(req.auth);
  const isLoginPage = pathname.startsWith("/login");
  const isAdminRoute = pathname.startsWith("/admin");

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isAdminRoute && req.auth?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/projects", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/projects/:path*", "/sessions/:path*", "/admin/:path*", "/workspace/:path*"],
};
