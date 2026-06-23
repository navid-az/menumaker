//functions
import { cookies } from "next/headers";
import jwtDecoder from "./jwtDecoder";

//types
import { type User } from "@/app/types/api/auth";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

// get user data
export async function getUserData() {
  const accessToken = (await cookies()).get("access");

  if (accessToken === undefined) {
    return null;
  }

  const userObj = jwtDecoder(accessToken?.value);
  if (!userObj) {
    return null;
  }

  const res = await fetch(
    `${SERVER_API_BASE_URL}/accounts/user/${userObj.user_id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<User>;
}
