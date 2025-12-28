"use server";

//functions
import { cookies } from "next/headers";

export async function createReservation(tableId: number, data: any) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `http://localhost:8000/tables/${tableId}/reservations/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);

      return {
        success: false,
        error: errorData.error || "Failed to reserve table",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }

  return { success: true };
}
