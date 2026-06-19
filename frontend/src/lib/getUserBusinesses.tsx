//types
import { type Business } from "@/app/types/api/business";

//functions
import { cookies } from "next/headers";

//get user's associated businesses(as the owner or as the personnel)
export async function getUserBusinesses() {
  const accessToken = (await cookies()).get("access");

  const res = await fetch(`http://127.0.0.1:8000/businesses/`, {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<Business[]>;
}
