"use server";

//functions
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import jwtDecoder from "@/lib/jwtDecoder";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

export async function initiatePayment(
  businessSlug: string,
  planSlug: string,
  duration: number
) {
  const accessToken = (await cookies()).get("access")?.value;
  if (!accessToken) return
  const userId = jwtDecoder(accessToken)?.user_id

  if (!userId) return []

  let paymentUrl: string;
  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/subscriptions/orders/?business_slug=${businessSlug}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ plan_slug: planSlug, duration: duration }),
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      console.error("API Error:", errorData);

      return {
        success: false,
        detail: errorData.detail || "Failed to initiate payment",
      };
    }
    const data = await res.json();

    updateTag(`business-subscription-${businessSlug}`);
    updateTag(`user-businesses-${userId}`);

    paymentUrl = data.payment_url;
  } catch (error: any) {
    return {
      success: false,
      detail: error?.detail || "An unexpected error occurred",
    };
  }
  // redirect user to payment gateway
  redirect(paymentUrl);
}
