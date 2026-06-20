//types
import { type Business } from "@/app/types/api/business";

//functions
import { cookies } from "next/headers";

//configs
import { API_BASE_URL } from "@/lib/config";

//get user's associated businesses(as the owner or as the personnel)
export async function getUserBusinesses() {
  const accessToken = (await cookies()).get("access");

  const res = await fetch(`${API_BASE_URL}/businesses/`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<Business[]>;
}
