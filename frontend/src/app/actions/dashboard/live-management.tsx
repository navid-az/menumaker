"use server";

//types
import { type UpdateOrder } from "@/app/types/payloads/menu";

//functions
import { cookies } from "next/headers";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

// update order's status and status's timestamp (ex: status=ready & prepared_at=current dateTime)
export async function updateOrder(
  orderId: number,
  order: Partial<UpdateOrder>
) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/orders/${orderId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(order),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("API Error:", errorData);

      return {
        success: false,
        detail: errorData.detail || "Failed to update order",
      };
    }
    return { success: true, detail: "Order updated successfully" };
  } catch (error: any) {
    return {
      success: false,
      detail: error?.detail || "An unexpected error occurred",
    };
  }
}
