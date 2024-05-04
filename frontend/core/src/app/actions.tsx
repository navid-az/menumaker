"use server";

import { redirect } from "next/navigation";
import jwtDecoder from "@/lib/jwtDecoder";
import { cookies } from "next/headers";
type DecodedJwtType = {
  token_type: "access" | "refresh";
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
};

export async function createCookie(
  name: string,
  value: string,
  httpOnly = true
) {
  cookies().set(name, value, { httpOnly: httpOnly });
  redirect("/");
}

export async function getItems() {
  const res = await fetch("http://127.0.0.1:8000/dashboard/items/");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

type ItemType = {
  name: string;
  category: number;
};
export async function createItem(data: ItemType) {
  const res = await fetch("http://127.0.0.1:8000/menu/venhan/items/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log("HEADERS:", res.headers);
  const items = await res.json();

  return items;
}

// // get user data
// export async function getUserData() {
//   const accessToken = cookies().get("access");
//   if (!accessToken) {
//     return null;
//   }

//   const userObj = jwtDecoder(accessToken.value);
//   if (!userObj) {
//     return null;
//   }

//   const res = await fetch(
//     `http://127.0.0.1:8000/accounts/token/validate/${userObj.user_id}`
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

//logOut user
export async function logOut() {
  cookies().delete("access");
  cookies().delete("refresh");
  verifyToken();
}

//verify access token
export async function verifyToken() {
  const accessToken = cookies().get("access");

  const res = await fetch("http://127.0.0.1:8000/accounts/token/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken?.value }),
  });
  if (res.ok) {
    return true;
  } else {
    return false;
  }
}
