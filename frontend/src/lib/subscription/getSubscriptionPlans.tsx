type DRFErrorResponse = {
  detail?: string;
  error?: string;
  [key: string]: any;
};

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";


// Fetches subscription plans from the backend API
export default async function getSubscriptionPlans() {

  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/subscriptions/plans/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      let errorData: DRFErrorResponse = {};
      try {
        errorData = await res.json();
      } catch { }

      throw new Error(
        errorData.detail ||
        errorData.error ||
        "Failed to fetch subscription plans"
      );
    }

    return res.json();
  } catch (error) {
    // During docker build, backend isn't running yet.
    // Return empty array so Next.js can complete static generation.
    // ISR will revalidate with real data once the app is deployed.
    console.warn("getSubscriptionPlans: fetch failed, using fallback.", error);
    return [];
  }
}
