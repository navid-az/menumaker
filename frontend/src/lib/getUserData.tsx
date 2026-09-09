//functions
import { cookies } from "next/headers";
import { cacheLife, cacheTag } from "next/cache";
import jwtDecoder from "./jwtDecoder";

//types
import { type User } from "@/app/types/api/auth";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";
export async function getUserData(): Promise<User | null> {
  const accessToken = (await cookies()).get("access")?.value;
  if (!accessToken) return null;

  const userObj = jwtDecoder(accessToken);
  if (!userObj) return null;

  return getCachedUserData(accessToken, userObj.user_id);
}

async function getCachedUserData(
  accessToken: string,
  userId: string
): Promise<User> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`user-data-${userId}`);

  const res = await fetch(`${SERVER_API_BASE_URL}/accounts/user/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<User>;
}