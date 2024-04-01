import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/forgotpassword" ||
    path === "/resetpassword";

  const token = request.cookies.get("token");

  if (isPublicPath) {
    // If the path is public and user has a token, redirect to home
    if (token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  } else {
    // If the path is private and user doesn't have a token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    // Optionally, you can verify the token here for added security
    // Example: Check if the token is valid, not expired, and associated with a valid user session
    // if (!isValidToken(token)) {
    //   return NextResponse.redirect(new URL("/login", request.nextUrl));
    // }
  }
}

export const config = {
  // Define all paths that require authentication
  matcher: [
    "/",
    "/profile",
    "/profile/:path*",
    "/signup",
    "/login",
    "/verifyemail",
    "/forgotpassword",
    "/forgotpassword/:path*",
    "/resetpassword",
    "/resetpassword/:path*",
  ],
};
