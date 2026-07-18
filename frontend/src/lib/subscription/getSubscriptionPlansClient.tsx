type DRFErrorResponse = {
  detail?: string;
  error?: string;
  [key: string]: any;
};

//configs
import { API_BASE_URL } from "@/lib/config";

// Fetches subscription plans from the backend API
export default async function getSubscriptionPlansClient() {
  try {
    const res = await fetch(`${API_BASE_URL}/subscriptions/plans/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      let errorData: DRFErrorResponse = {};
      try {
        errorData = await res.json();
      } catch {}

      throw new Error(
        errorData.detail ||
          errorData.error ||
          "Failed to fetch subscription plans"
      );
    }

    return res.json();
  } catch (error) {
    console.warn("getSubscriptionPlans: fetch failed, using fallback.", error);
  }
}
