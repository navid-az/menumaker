//functions
import { cookies } from "next/headers";
import { cacheLife, cacheTag } from "next/cache";

//types
import { type Business } from "@/app/types/api/business";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

export async function getUserBusinesses(): Promise<Business[]> {
  const accessToken = (await cookies()).get("access")?.value;
  if (!accessToken) return [];

  return getCachedUserBusinesses(accessToken);
}

async function getCachedUserBusinesses(accessToken: string): Promise<Business[]> {
  "use cache";
  cacheLife("days");
  cacheTag(`user-businesses-${accessToken}`);

  const res = await fetch(`${SERVER_API_BASE_URL}/businesses/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}