//functions
import { cookies } from "next/headers";

export async function getBusinessSubscription(business_slug: string) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(
      `http://localhost:8000/subscriptions/business/${business_slug}/subscription/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
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
