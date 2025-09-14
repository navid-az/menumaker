"use server";

//components
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function deletePersonnel(
  business_slug: string,
  personnel_id: number
) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(
      `http://localhost:8000/business/${business_slug}/personnel/${personnel_id}/delete/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        detail: errorData.error || "Failed to delete personnel",
      };
    }
    revalidateTag("personnel");
    return { success: true, detail: "Personnel deleted successfully" };
  } catch (error: any) {
    return {
      success: false,
      detail: error?.message || "An unexpected error occurred",
    };
  }
}
