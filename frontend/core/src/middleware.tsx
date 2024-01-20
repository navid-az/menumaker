import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const refreshToken = "http://127.0.0.1:8000/accounts/token/refresh/";

export async function middleware(request: NextRequest) {
  let access = request.cookies.get("access");
  let refresh = request.cookies.get("refresh");

  type DecodedAccessTokenType = {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
  };

  let decodedAccessToken: DecodedAccessTokenType | undefined = undefined;

  const currentDate = Math.trunc(new Date().getTime() / 1000);

  //decoded jwt payload
  if (access) {
    decodedAccessToken = jwtDecode(access.value);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Authorization", "Bearer " + access?.value);

  const tokenValidate = `http://127.0.0.1:8000/accounts/token/validate/${decodedAccessToken?.user_id}`;

  //routs which users need to be authenticated to gain access
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    currentDate >= decodedAccessToken?.exp!
  ) {
    try {
      const checkToken = await fetch(tokenValidate, {
        headers: requestHeaders,
      });
      // if the access token is not valid anymore create a new one
      if (!checkToken.ok) {
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
