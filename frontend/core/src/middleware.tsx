// functions
import { NextResponse } from "next/server";

// libraries
import * as jose from "jose";

// types
import type { NextRequest } from "next/server";
type jwtPayloadType = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  permissions: { business: string; branches?: string[]; isOwner: boolean }[];
};

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Extract business and branch slugs from the pathname
  const segments = pathname.split("/").filter(Boolean);
  const businessSlug = segments[1];
  const branchSlug = segments[2];

  if (pathname.startsWith("/dashboard/") && businessSlug) {
    let token = request.cookies.get("access")?.value;
    if (!token) {
      console.log("NO ACCESS TOKEN FOUND");
      return NextResponse.redirect(new URL("/register", request.url));
    }

    // Secret key for verifying the JWT ~~~~NEEDS CHANGE~~~~
    const secret = new TextEncoder().encode(
      "django-insecure-&@-4_u6z^b7xaq)l=7a@dh*3b%ac)$7d$5t0lkf3f#2@ky2&6e"
    );

    let jwtPayload: jwtPayloadType;

    // Verify access token
    try {
      const { payload } = await jose.jwtVerify(token, secret);
      const jwtPayload = payload as jwtPayloadType;

      // Find permissions for this business
      const perm = jwtPayload.permissions.find(
        (permission) => permission.business === businessSlug
      );

      if (!perm) {
        // User has no permissions for this business
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      // Check if user has permissions for this branch
      if (perm.isOwner || perm.branches?.includes(branchSlug)) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (error: any) {
      // Handle expired token
      if (error.code === "ERR_JWT_EXPIRED") {
        // Attempt token refresh
        try {
          const refreshToken = request.cookies.get("refresh")?.value;

          // No refresh tokens found
          if (!refreshToken) {
            return NextResponse.redirect(new URL("/register", request.url));
          }

          // Fetch new access token
          const response = await fetch(
            "http://localhost:8000/accounts/token/refresh/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh: refreshToken }),
            }
          );
          if (!response.ok) {
            return NextResponse.redirect(new URL("/register", request.url));
          }

          // Update token
          const data = await response.json();
          const refreshedToken = data.access;

          const responseWithNewToken = NextResponse.next();
          responseWithNewToken.cookies.set({
            httpOnly: true,
            name: "access",
            value: refreshedToken,
          });

          // Verify new access token
          try {
            const { payload } = await jose.jwtVerify(refreshedToken, secret);
            jwtPayload = payload as jwtPayloadType;
          } catch {
            return NextResponse.redirect(new URL("/register", request.url));
          }

          return responseWithNewToken;
        } catch {
          return NextResponse.redirect(new URL("/register", request.url));
        }
      }
      // If token is expired
      return NextResponse.redirect(new URL("/register", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
