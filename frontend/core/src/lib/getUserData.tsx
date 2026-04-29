//functions
import jwtDecoder from "./jwtDecoder";

//types
import { type User } from "@/app/types/api/auth";

// get user data
export async function getUserData(accessToken: string) {
  const userObj = jwtDecoder(accessToken);
  if (!userObj) {
    return null;
  }

  const res = await fetch(
    `http://127.0.0.1:8000/accounts/user/${userObj.user_id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<User>;
}
