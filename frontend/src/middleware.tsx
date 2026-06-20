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
  roles: Record<
    string,
    { business: string; branches?: string[]; role: string }
  >;
};

//configs
import { API_BASE_URL } from "@/lib/config";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Extract business and branch slugs from the pathname
  const segments = pathname.split("/").filter(Boolean);
  const businessSlug = segments[1];
  const branchSlug = segments[2];

  // Secret key for verifying the JWT
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  // if (pathname.startsWith("/dashboard/") && businessSlug) {
  let token = request.cookies.get("access")?.value;
  if (!token) {
    console.log("NO ACCESS TOKEN FOUND");
    return NextResponse.redirect(new URL("/register", request.url));
  }

  let jwtPayload: jwtPayloadType;

  // Verify access token
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    const jwtPayload = payload as jwtPayloadType;

    if (pathname.startsWith("/dashboard/") && businessSlug) {
      // Find permissions for this business
      const perm = jwtPayload.roles[businessSlug];

      if (!perm) {
        // User has no permissions for this business
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      // Check if user has permissions for this branch
      if (perm.role === "owner" || perm.branches?.includes(branchSlug)) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
    if (pathname.startsWith("/register") && searchParams.has("token")) {
      // Handle invitation token
      const invitationToken = searchParams.get("token");
      if (invitationToken) {
        try {
          await jose.jwtVerify(invitationToken, secret);
        } catch (error: any) {
          if (error.code === "ERR_JWT_EXPIRED") {
            return NextResponse.redirect(
              new URL("/invitation-expired", request.url)
            );
          }
        }
      }
    }
  } catch (error: any) {
    // Handle expired token
    if (error.code === "ERR_JWT_EXPIRED") {
      // Attempt token refresh
      try {
        const refreshToken = request.cookies.get("refresh")?.value;

        // No refresh tokens found
        if (!refreshToken) {
          console.log("NO REFRESH TOKEN FOUND");

          return NextResponse.redirect(new URL("/register", request.url));
        }

        // Fetch new access token
        const response = await fetch(
          `${API_BASE_URL}/accounts/token/refresh/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          }
        );
        if (!response.ok) {
          console.log("FAILED TO REFRESH TOKEN");

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
  // } else if (pathname.startsWith("/register") && searchParams.has("token")) {
  //   // Handle invitation token
  //   const invitationToken = searchParams.get("token");
  //   if (invitationToken) {
  //     try {
  //       await jose.jwtVerify(invitationToken, secret);
  //     } catch (error: any) {
  //       if (error.code === "ERR_JWT_EXPIRED") {
  //         return NextResponse.redirect(
  //           new URL("/invitation-expired", request.url)
  //         );
  //       }
  //     }
  //   }
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/builder/:path*",
    "/checkout/:path*",
    "/:businessSlug/menu/update/:path*",
  ],
};
