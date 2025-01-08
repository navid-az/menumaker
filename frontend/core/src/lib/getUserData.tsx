import { cookies } from "next/headers";
import jwtDecoder from "./jwtDecoder";

// get user data
export async function getUserData() {
  const accessToken = (await cookies()).get("access");
  if (!accessToken) {
    return null;
  }

  const userObj = jwtDecoder(accessToken.value);
  if (!userObj) {
    return null;
  }

  const res = await fetch(
    `http://127.0.0.1:8000/accounts/user/${userObj.user_id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
