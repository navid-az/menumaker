//functions
import { cookies } from "next/headers";
import { cacheLife, cacheTag } from "next/cache";
import jwtDecoder from "../jwtDecoder";

//types
import { type Business } from "@/app/types/api/business";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

export async function getUserBusinesses(): Promise<Business[]> {
  const accessToken = (await cookies()).get("access")?.value;
  if (!accessToken) return [];

  const userId = jwtDecoder(accessToken)?.user_id

  if (!userId) return []

  return getCachedUserBusinesses(accessToken, userId);
}

async function getCachedUserBusinesses(accessToken: string, userId: string): Promise<Business[]> {
  "use cache";
  cacheLife("days");
  cacheTag(`user-businesses-${userId}`);

  const res = await fetch(`${SERVER_API_BASE_URL}/businesses/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}