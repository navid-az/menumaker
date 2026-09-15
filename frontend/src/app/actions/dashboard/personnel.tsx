"use server";

//functions
import { cookies } from "next/headers";
import { updateTag } from "next/cache";

//types
import { type Personnel } from "@/app/[locale]/dashboard/personnel/columns";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

export async function invitePersonnel(businessSlug: string, branchSlug: string, data: Personnel) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/personnel/business/${businessSlug}/personnel/assign/`,
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

    updateTag(`personnel-${businessSlug}-${branchSlug}`)
    return { success: true, detail: "Personnel invited successfully" };
  } catch (error: any) {
    return {
      success: false,
      detail: error?.detail || "An unexpected error occurred",
    };
  }
}

export async function deletePersonnel(
  businessSlug: string,
  branchSlug: string,
  personnelId: number
) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/business/${businessSlug}/personnel/${personnelId}/delete/`,
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

    updateTag(`personnel-${businessSlug}-${branchSlug}`)
    return { success: true, detail: "Personnel deleted successfully" };
  } catch (error: any) {
    return {
      success: false,
      detail: error?.message || "An unexpected error occurred",
    };
  }
}
