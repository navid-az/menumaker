import { NextResponse } from "next/server";
import * as jose from "jose";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";
import { APP_URL, SERVER_API_BASE_URL } from "@/lib/config";

type JwtPayloadType = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  roles: Record<
    string,
    {
      business: string;
      branches?: string[];
      role: string;
    }
  >;
};

const ROOT_DOMAIN = "menomaker.ir";

const RESERVED_SUBDOMAINS = new Set([
  "www",
  "api",
  "admin",
  "static",
  "media",
  "assets",
  "cdn",
  "mail",
  "smtp",
  "ftp",
  "support",
  "help",
  "status",
  "app",
  "dashboard",
  "register",
  "builder",
  "checkout",
  "auth",
  "ws",
]);

const handleI18nRouting = createMiddleware(routing);

function getBusinessSlug(request: NextRequest): string | null {
  const host = request.headers.get("host");

  if (!host) return null;

  // Remove the port and normalize the hostname.
  const hostname = host.split(":")[0].toLowerCase();

  const suffix = hostname.endsWith(`.${ROOT_DOMAIN}`)
    ? `.${ROOT_DOMAIN}`
    : process.env.NODE_ENV === "development" && hostname.endsWith(".localhost")
      ? ".localhost"
      : null;

  if (!suffix) return null;

  const subdomain = hostname.slice(0, -suffix.length);

  if (!subdomain || subdomain.includes(".")) return null;
  if (RESERVED_SUBDOMAINS.has(subdomain)) return null;
  if (!/^[a-z0-9_-]+$/.test(subdomain)) return null;

  return subdomain;
}

function resolveTenantPath(
  pathname: string,
  businessSlug: string,
): string | null {
  // Dashboard:
  // /dashboard/niavaran-1-1/liveManagement/all
  // becomes:
  // /dashboard/lamiz/niavaran-1-1/liveManagement/all

  if (pathname === "/dashboard") {
    return null;
  }

  if (pathname.startsWith("/dashboard/")) {
    const segments = pathname.split("/").filter(Boolean);

    // Already contains the business slug. Don't inject it twice.
    if (segments[1] === businessSlug) return null;

    return `/dashboard/${businessSlug}${pathname.slice("/dashboard".length)}`;
  }

  // Public menu and business editor routes:
  // /home  -> /lamiz/home
  // /menu  -> /lamiz/menu
  // /orders -> /lamiz/orders
  // /update -> /lamiz/update

  if (pathname === "/") {
    return `/${businessSlug}/home`;
  }

  const tenantRoutes = ["/home", "/menu", "/orders", "/update"];

  const matchesTenantRoute = tenantRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (matchesTenantRoute) {
    return `/${businessSlug}${pathname}`;
  }

  return null;
}

function isProtected(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) return false;

  return (
    segments[0] === "dashboard" ||
    segments[0] === "builder" ||
    segments[0] === "checkout" ||
    // Business editor route: /{businessSlug}/update
    (segments.length >= 2 && segments[1] === "update") ||
    // Keep compatibility with the previous menu/update pattern.
    (segments.length >= 3 && segments[1] === "menu" && segments[2] === "update")
  );
}

function getRegisterUrl(request: NextRequest): URL {
  const platformOrigin = APP_URL || `https://${ROOT_DOMAIN}`;

  return new URL("/register", platformOrigin);
}

function isRedirect(response: NextResponse): boolean {
  return response.status >= 300 && response.status < 400;
}

export default async function proxy(request: NextRequest) {
  console.log("[HOST DEBUG]", {
    url: request.url,
    nextUrlHost: request.nextUrl.host,
    nextUrlHostname: request.nextUrl.hostname,
    hostHeader: request.headers.get("host"),
    forwardedHost: request.headers.get("x-forwarded-host"),
  });
  const businessSlug = getBusinessSlug(request);

  console.log("[TENANT DEBUG]", {
    hostname: request.nextUrl.hostname,
    pathname: request.nextUrl.pathname,
    businessSlug,
  });

  if (businessSlug) {
    const internalPath = resolveTenantPath(
      request.nextUrl.pathname,
      businessSlug,
    );

    console.log("[TENANT REWRITE]", {
      internalPath,
    });

    if (internalPath) {
      request.nextUrl.pathname = internalPath;
    }
  }

  console.log("[FINAL PROXY PATH]", request.nextUrl.pathname);

  let authResponse: NextResponse | null = null;

  if (isProtected(request.nextUrl.pathname)) {
    authResponse = await runAuthChecks(request);

    if (isRedirect(authResponse)) {
      return authResponse;
    }
  }

  const i18nResponse = handleI18nRouting(request);

  // Preserve cookies set by the auth check, such as a refreshed access token.
  if (authResponse) {
    authResponse.cookies.getAll().forEach((cookie) => {
      i18nResponse.cookies.set(cookie);
    });
  }

  return i18nResponse;
}

async function runAuthChecks(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  const token = request.cookies.get("access")?.value;

  if (!token) {
    return NextResponse.redirect(getRegisterUrl(request));
  }

  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  try {
    const { payload } = await jose.jwtVerify(token, secret);
    const jwtPayload = payload as JwtPayloadType;

    if (pathname.startsWith("/dashboard/")) {
      const businessSlug = segments[1];
      const branchSlug = segments[2];

      const permission = jwtPayload.roles[businessSlug];

      if (!permission) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      if (
        permission.role === "owner" ||
        (branchSlug && permission.branches?.includes(branchSlug))
      ) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      const refreshToken = request.cookies.get("refresh")?.value;

      if (!refreshToken) {
        return NextResponse.redirect(getRegisterUrl(request));
      }

      const response = await fetch(
        `${SERVER_API_BASE_URL}/accounts/token/refresh/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        },
      );

      if (!response.ok) {
        return NextResponse.redirect(getRegisterUrl(request));
      }

      const { access: refreshedToken } = await response.json();

      try {
        await jose.jwtVerify(refreshedToken, secret);
      } catch {
        return NextResponse.redirect(getRegisterUrl(request));
      }

      const nextResponse = NextResponse.next();

      nextResponse.cookies.set({
        httpOnly: true,
        name: "access",
        value: refreshedToken,
      });

      return nextResponse;
    }

    return NextResponse.redirect(getRegisterUrl(request));
  }
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
