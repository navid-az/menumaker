"use server";

//functions
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function initiatePayment(
  businessSlug: string,
  planSlug: string,
  duration: number
) {
  const accessToken = (await cookies()).get("access");
  let paymentUrl: string;
  try {
    const res = await fetch(
      `http://localhost:8000/subscriptions/orders/?business_slug=${businessSlug}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
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
