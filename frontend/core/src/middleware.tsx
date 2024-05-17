//functions
import { NextResponse } from "next/server";
// import { getUserData } from "./lib/getUserData";
// import { getUserPlaces } from "./lib/getUserPlaces";

//server actions
import { verifyToken } from "./app/actions";

//types
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let access = request.cookies.get("access");
  let refresh = request.cookies.get("refresh");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Authorization", "Bearer " + access?.value);

  //routes which users need to be authenticated to gain access
  if (request.nextUrl.pathname.includes("/dashboard")) {
    const isAuthenticated = await verifyToken();
    try {
      // if the access token is not valid anymore create a new one
      if (!isAuthenticated) {
        const getNewToken = await fetch(
          "http://127.0.0.1:8000/accounts/token/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refresh?.value }),
          }
        );
        // if the refresh token is not valid anymore send user to register route
        if (!getNewToken.ok) {
          return NextResponse.redirect(new URL("/register", request.url));
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
      //here user should be checked to see if they can access the specific route they've requested
      // else {
      //   const { pk } = await getUserData();
      //   const userPlaces = await getUserPlaces(pk);
      //   userPlaces.map((place) => {
      //     if (!request.nextUrl.pathname.startsWith(`/venhan`)) {
      //       return NextResponse.redirect("/");
      //     }
      //   });
      // }
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
