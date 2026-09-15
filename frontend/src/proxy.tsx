// functions
import { NextResponse } from "next/server";

// libraries
import * as jose from "jose";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// types
import type { NextRequest } from "next/server";
type jwtPayloadType = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  roles: Record<string, { business: string; branches?: string[]; role: string }>;
};

// configs
import { SERVER_API_BASE_URL } from "@/lib/config";

const handleI18nRouting = createMiddleware(routing);

// PROTECTED routes
const PROTECTED: RegExp[] = [
  /^\/dashboard(\/|$)/,
  /^\/builder(\/|$)/,
  /^\/checkout(\/|$)/,
  /^\/[^/]+\/menu\/update(\/|$)/, // /:businessSlug/menu/update/...
];

function isProtected(pathname: string) {
  return PROTECTED.some((re) => re.test(pathname));
}

export default async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  let authResponse: NextResponse | null = null;

  if (isProtected(pathname)) {
    authResponse = await runAuthChecks(request);
    // If auth failed (redirect to /register or /unauthorized), short-circuit.
    // The target page will go through this proxy on its own next request
    // and get localized correctly then — no need to run i18n on this pass.
    if (isRedirect(authResponse)) return authResponse;
  }
  // else if (pathname.startsWith("/register") && searchParams.has("token")) {
  //   // Public route, but still needs the invitation-token check
  //   authResponse = await runInvitationCheck(request);
  //   if (isRedirect(authResponse)) return authResponse;
  // }

  // Runs for every route, protected or not. This is what resolves the locale.
  const i18nResponse = handleI18nRouting(request);

  // Carry over anything auth logic set (e.g. a refreshed access-token cookie)
  if (authResponse) {
    authResponse.cookies.getAll().forEach((cookie) => {
      i18nResponse.cookies.set(cookie);
    });
  }

  return i18nResponse;
}

function isRedirect(res: NextResponse) {
  return res.status >= 300 && res.status < 400;
}

async function runAuthChecks(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const businessSlug = segments[1];
  const branchSlug = segments[2];
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  const token = request.cookies.get("access")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  try {
    const { payload } = await jose.jwtVerify(token, secret);
    const jwtPayload = payload as jwtPayloadType;

    if (pathname.startsWith("/dashboard/") && businessSlug) {
      const perm = jwtPayload.roles[businessSlug];
      if (!perm) return NextResponse.redirect(new URL("/unauthorized", request.url));
      if (perm.role === "owner" || perm.branches?.includes(branchSlug)) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      const refreshToken = request.cookies.get("refresh")?.value;
      if (!refreshToken) return NextResponse.redirect(new URL("/register", request.url));

      const response = await fetch(`${SERVER_API_BASE_URL}/accounts/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (!response.ok) return NextResponse.redirect(new URL("/register", request.url));

      const { access: refreshedToken } = await response.json();
      const res = NextResponse.next();
      res.cookies.set({ httpOnly: true, name: "access", value: refreshedToken });

      try {
        await jose.jwtVerify(refreshedToken, secret);
      } catch {
        return NextResponse.redirect(new URL("/register", request.url));
      }
      return res;
    }
    return NextResponse.redirect(new URL("/register", request.url));
  }
}

// async function runInvitationCheck(request: NextRequest) {
//   const { searchParams } = request.nextUrl;
//   const secret = new TextEncoder().encode(process.env.SECRET_KEY);
//   const invitationToken = searchParams.get("token");

//   if (invitationToken) {
//     try {
//       await jose.jwtVerify(invitationToken, secret);
//     } catch (error: any) {
//       if (error.code === "ERR_JWT_EXPIRED") {
//         return NextResponse.redirect(new URL("/invitation-expired", request.url));
//       }
//     }
//   }
//   return NextResponse.next();
// }

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};