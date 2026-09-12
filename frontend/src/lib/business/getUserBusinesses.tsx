//functions
import { cookies } from "next/headers";

//types
import { type Business } from "@/app/types/api/business";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

export async function getUserBusinesses(): Promise<Business[]> {
  const accessToken = (await cookies()).get("access")?.value;

  if (!accessToken) return [];

  const res = await fetch(`${SERVER_API_BASE_URL}/businesses/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}