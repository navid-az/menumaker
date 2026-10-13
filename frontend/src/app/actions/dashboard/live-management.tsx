"use server";

//types
import { type UpdateOrder } from "@/app/types/payloads/menu";
import { type Payment } from "@/app/types/api/business";
import { type Order } from "@/app/types/api/menu";

//functions
import { cookies } from "next/headers";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

export async function endTableSession(sessionCode: string) {
  try {
    if (!sessionCode) {
      return {
        success: false as const,
        error: "sessionNotFound",
      };
    }

    const accessToken = (await cookies()).get("access")?.value;

    if (!accessToken) {
      return {
        success: false as const,
        error: "authenticationRequired",
      };
    }

    const res = await fetch(
      `${SERVER_API_BASE_URL}/sessions/${encodeURIComponent(sessionCode)}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "closed" }),
        cache: "no-store",
      },
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false as const,
        error:
          typeof data.detail === "string"
            ? data.detail
            : "requestFailed",
      };
    }

    return {
      success: true as const,
      session: data,
    };
  } catch {
    return {
      success: false as const,
      error: "requestFailed",
    };
  }
}

// update order's status and status's timestamp (ex: status=ready & prepared_at=current dateTime)
export async function updateOrder(
  orderId: number,
  order: Partial<UpdateOrder>
): Promise<{ success: boolean, detail: string, orderData?: Order }> {
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

    const orderData = await res.json()
    return { success: true, detail: "Order updated successfully", orderData: orderData };
  } catch (error: any) {
    return {
      success: false,
      detail: error?.detail || "An unexpected error occurred",
    };
  }
}


export async function createPayment(sessionCode: string, payment: any): Promise<{ success: boolean, detail: string, paymentData?: Payment }> {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/sessions/${sessionCode}/payments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(payment),
    })
    if (!res.ok) {
      const errorData = await res.json();

      return {
        success: false,
        detail: errorData.detail || "Failed to create payment",
      };
    }
    const paymentData = await res.json()

    return { success: true, detail: "Payment created successfully", paymentData: paymentData };
  } catch (error: any) {
    return {
      success: false,
      detail: error?.detail || "An unexpected error occurred",
    };
  }
}