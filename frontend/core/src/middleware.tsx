import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/actions";

const refreshToken = "http://127.0.0.1:8000/accounts/token/refresh/";

export async function middleware(request: NextRequest) {
  let access = request.cookies.get("access");
  let refresh = request.cookies.get("refresh");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Authorization", "Bearer " + access?.value);

  //routs which users need to be authenticated to gain access
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const isAuthenticated = await verifyToken();
    try {
      // if the access token is not valid anymore create a new one
      if (!isAuthenticated) {
        const getNewToken = await fetch(refreshToken, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refresh?.value }),
        });
        // if the refresh token is not valid anymore send user to register route
        if (!getNewToken.ok) {
          return NextResponse.redirect("http://127.0.0.1:3000/register");
        }
        const newAccessToken = await getNewToken.json();

        const response = NextResponse.next();
        response.cookies.set({
          name: "access",
          value: newAccessToken.access,
          httpOnly: true,
        });
        return response;
      }
    } catch (error) {
      return NextResponse.redirect("http://127.0.0.1:3000/");
    }
  }
}
