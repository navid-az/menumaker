type DRFErrorResponse = {
  detail?: string;
  error?: string;
  [key: string]: any;
};

// Fetches subscription plans from the backend API
export default async function getSubscriptionPlans() {
  const res = await fetch("http://localhost:8000/subscriptions/plans/", {
    method: "GET",

    next: {
      revalidate: 86400, // 1 day
    },

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
}
