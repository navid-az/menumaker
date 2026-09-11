//functions
import { cookies } from "next/headers";
import { cacheLife, cacheTag } from "next/cache";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

export async function getBusinessSubscription(businessSlug: string) {
  const accessToken = (await cookies()).get("access")?.value;
  if (!accessToken) return [];

  return getCachedBusinessSubscription(accessToken, businessSlug);
}

async function getCachedBusinessSubscription(accessToken: string, businessSlug: string) {
  "use cache";
  cacheLife("days");
  cacheTag(`business-subscription-${businessSlug}`);

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/subscriptions/business/${businessSlug}/subscription/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      return {
        error: errorData.error || "Failed to fetch subscription",
      };
    }
    return await res.json();
  } catch (error: any) {
    return {
      error: error.message || "An unexpected error occurred",
    };
  }
}