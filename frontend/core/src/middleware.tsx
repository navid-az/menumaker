// functions
import { NextResponse } from "next/server";

// libraries
import * as jose from "jose";

// types
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const business_slug = pathname.split("/dashboard/")[1]?.split("/")[0];
  const branch_slug = searchParams.get("branch_slug") || "";

  if (pathname.startsWith("/dashboard/") && business_slug) {
    let token = request.cookies.get("access")?.value;
    if (!token) {
      console.log("NO ACCESS TOKEN FOUND");
      return NextResponse.redirect(new URL("/register", request.url));
    }

    const secret = new TextEncoder().encode(
      "django-insecure-&@-4_u6z^b7xaq)l=7a@dh*3b%ac)$7d$5t0lkf3f#2@ky2&6e"
    );
    let payload;

    // Verify access token
    try {
      const { payload: jwtPayload } = await jose.jwtVerify(token, secret);
      payload = jwtPayload;
    } catch (error: any) {
      // Handle expired token
      if (error.code === "ERR_JWT_EXPIRED") {
        // Attempt token refresh
        try {
          const refreshToken = request.cookies.get("refresh")?.value;
          if (!refreshToken) {
            console.log("NO REFRESH TOKENS FOUND");
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
            console.log("UNSUCCESSFUL RESPONSE FROM REFRESH ENDPOINT");
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
            console.log("new access token:", token);

            const { payload: jwtPayload } = await jose.jwtVerify(
              refreshedToken,
              secret
            );
            payload = jwtPayload;
          } catch {
            console.log("VERIFY NEW ACCESS TOKEN FAILED");

            return NextResponse.redirect(new URL("/register", request.url));
          }

          return responseWithNewToken;
        } catch {
          console.log("REFRESH TOKEN EXPIRED OR INVALID");

          return NextResponse.redirect(new URL("/register", request.url));
        }
      }
      // If token is expired
      return NextResponse.redirect(
        new URL("/login?error=invalid_token", request.url)
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
