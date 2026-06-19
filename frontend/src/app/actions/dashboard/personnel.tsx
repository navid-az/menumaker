"use server";

//components
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

//types
import { type Personnel } from "@/app/dashboard/personnel/columns";

export async function invitePersonnel(business_slug: string, data: Personnel) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(
      `http://localhost:8000/personnel/business/${business_slug}/personnel/assign/`,
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
      console.error("API Error:", errorData);
      return {
        success: false,
        detail: errorData.detail || "Failed to invite personnel",
      };
    }
    revalidateTag("personnel");
    return { success: true, detail: "Personnel invited successfully" };
  } catch (error: any) {
    return {
      success: false,
      detail: error?.detail || "An unexpected error occurred",
    };
  }
}

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
