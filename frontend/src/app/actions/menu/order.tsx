"use server";

//types
import { CreateOrder } from "@/app/types/payloads/menu";

//configs
import { API_BASE_URL } from "@/lib/config";

export async function placeOrder(branchSlug: string, order: CreateOrder) {
  try {
    const res = await fetch(`${API_BASE_URL}/branches/${branchSlug}/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("API Error:", errorData);

      return {
        success: false,
        detail: errorData.detail || "Failed to invite personnel",
      };
    }
    return { success: true, detail: "Order placed successfully" };
  } catch (error: any) {
    return {
      success: false,
      detail: error?.detail || "An unexpected error occurred",
    };
  }
}
