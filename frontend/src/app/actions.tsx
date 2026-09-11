"use server";

//functions
import { cookies } from "next/headers";
import { updateTag } from "next/cache";

//types
import { type SetupSchemaType } from "./(creator)/builder/components/setup/Setup";
import { type BranchFormType } from "./dashboard/components/CreateBranchForm";
import { type BuilderFormType } from "./(creator)/builder/components/builder/BuilderTest";
import { type MenuItem } from "./types/api/menu";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

// Pulls a readable message out of DRF's validation error shape, which
// returns field-keyed arrays (e.g. {"non_field_errors": ["Maximum of..."]})
// rather than a single "error"/"detail" key.
function extractErrorMessage(errorData: any): string {
  if (!errorData) return "Something went wrong";
  if (typeof errorData === "string") return errorData;
  const firstKey = Object.keys(errorData)[0];
  const firstValue = errorData[firstKey];
  return Array.isArray(firstValue) ? firstValue[0] : String(firstValue);
}

//~~~~dashboard table mutation-related actions~~~
type CategoryFormData = {
  name?: string;
  icon?: number | null;
  is_active?: boolean
};

export async function createCategory(businessSlug: string, data: CategoryFormData) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${businessSlug}/categories/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
        body: JSON.stringify({
          name: data.name,
          icon: data.icon
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { success: false, error: extractErrorMessage(errorData) };
    }
  } catch (error: any) {
    return { success: false, error: error.message || "An unexpected error occurred" };
  }

  updateTag(`business-categories-${businessSlug}`)
  return { success: true };
}

export async function updateCategory(
  businessSlug: string,
  categoryId: number,
  data: CategoryFormData
) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/categories/${categoryId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify({
        name: data.name,
        is_active: data.is_active,
        icon: data.icon,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { success: false, error: extractErrorMessage(errorData) };
    }
  } catch (error: any) {
    return { success: false, error: error.message || "An unexpected error occurred" };
  }

  updateTag(`business-categories-${businessSlug}`)
  return { success: true };
}

export async function deleteCategory(businessSlug: string, categoryId: number) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/categories/${categoryId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Failed to delete category",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
  updateTag(`business-categories-${businessSlug}`)
  return { success: true };
}

//ITEM ACTIONS
//get all menu items
export async function getItems() {
  const res = await fetch(`${SERVER_API_BASE_URL}/dashboard/items/`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function createItem(businessSlug: string, data: Partial<MenuItem>) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/businesses/${businessSlug}/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { success: false, error: extractErrorMessage(errorData) };
    }
  } catch (error: any) {
    return { success: false, error: error.message || "An unexpected error occurred" };
  }

  updateTag(`business-items-${businessSlug}`);
  return { success: true };
}

export async function updateItem(
  businessSlug: string,
  itemId: number,
  data: Partial<MenuItem>,
  branchSlug?: string
) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/items/${itemId}/${branchSlug ? `?branch_slug=${branchSlug}` : ""}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { success: false, error: extractErrorMessage(errorData) };
    }
  } catch (error: any) {
    return { success: false, error: error.message || "An unexpected error occurred" };
  }

  updateTag(`business-items-${businessSlug}`);
  return { success: true };
}

export async function deleteItem(businessSlug: string, itemId: number) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/items/${itemId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Failed to delete item",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
  updateTag(`business-items-${businessSlug}`);
  return { success: true };
}

//create menu
type GlobalStyling = {
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
  bg_color: string;
  border_radius: "sm" | "md" | "lg";
  unit_display_type: "comp" | "";
  click_animation: "ripple" | "tactile";
};

type MenuType = Omit<
  BuilderFormType,
  "global_styling" | "business" | "menu_sections"
> & {
  global_styling: Omit<BuilderFormType["global_styling"], "color_palette"> & {
    primary_color: string;
    secondary_color: string;
    tertiary_color: string;
    bg_color: string;
  };
};

export async function createMenu(businessSlug: string, data: MenuType) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${businessSlug}/menu/`,
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
      console.log("errorData:", errorData);

      return {
        success: false,
        error: errorData.error || "Failed to create menu",
      };
    }

    const responseData = await res.json();
    return { success: true, data: responseData };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}
export async function updateMenu(businessSlug: string, data: MenuType) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${businessSlug}/menu/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.log("errorData:", errorData);

      return {
        success: false,
        error: errorData.error || "Failed to update menu",
      };
    }

    const responseData = await res.json();
    return { success: true, data: responseData };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

//create business
export async function createBusiness(data: SetupSchemaType) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/businesses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);

      return {
        success: false,
        error: errorData.error || "Failed to register business",
      };
    }

    const responseData = await res.json();
    return { success: true, data: responseData };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

// branch actions
export async function createBranch(
  data: BranchFormType,
  businessSlug: string
) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${businessSlug}/branches/`,
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
        error: errorData.error || "Failed to create branch",
      };
    }
    const responseData = await res.json();
    updateTag(`business-branches-${businessSlug}`);

    return { success: true, data: responseData };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function updateBranch(businessSlug: string, branchSlug: string, data: BranchFormType) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/branches/${branchSlug}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);

      return {
        success: false,
        error: errorData.error || "Failed to update branch",
      };
    }
    const responseData = await res.json();
    updateTag(`business-branches-${businessSlug}`);

    return { success: true, data: responseData };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

// table actions
export async function createTable(data: any, businessSlug: string, branchSlug: string) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/branches/${branchSlug}/tables/`,
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
        error: errorData.error || "Failed to create table",
      };
    }
    const responseData = await res.json();
    updateTag(`business-tables-${businessSlug}-${branchSlug}`);

    return { success: true, data: responseData };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function updateTable(
  data: any,
  businessSlug: string,
  branchSlug: string,
  tableId: number
) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/tables/${tableId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);

      return {
        success: false,
        error: errorData.error || "Failed to update table",
      };
    }
    const responseData = await res.json();
    updateTag(`business-tables-${businessSlug}-${branchSlug}`);

    return { success: true, data: responseData };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function deleteTable(businessSlug: string, branchSlug: string, tableId: number) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/tables/${tableId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Failed to delete table",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
  updateTag(`business-tables-${businessSlug}-${branchSlug}`);

  return { success: true };
}

type UploadedAsset = {
  id: number;
  url: string;
  temp_id: string | null;
  collection: string;
  media_type: string;
  order: number;
  created: string;
};

type UploadResult =
  | { success: true; assets: UploadedAsset[] }
  | { success: false; error: string };

export async function uploadImage(data: FormData): Promise<UploadResult> {
  const accessToken = (await cookies()).get("access");

  const collection = data.get("collection");
  const tempId = data.get("temp_id");
  const files = data.getAll("images") as File[];

  if (!files.length) {
    return { success: false, error: "No files provided" };
  }

  try {
    // The endpoint creates one MediaAsset per request, so a multi-file drop
    // fans out into parallel requests rather than a single batched POST.
    const uploads = files.map((file) => {
      const singleFormData = new FormData();
      singleFormData.append("file", file);
      singleFormData.append("collection", collection as string);
      singleFormData.append("temp_id", tempId as string);
      singleFormData.append("media_type", "image");

      return fetch(`${SERVER_API_BASE_URL}/assets/asset/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
        },
        body: singleFormData,
      });
    });

    const responses = await Promise.all(uploads);

    const failed = responses.find((res) => !res.ok);
    if (failed) {
      const errorData = await failed.json().catch(() => null);
      return { success: false, error: extractErrorMessage(errorData) };
    }

    const assets: UploadedAsset[] = await Promise.all(
      responses.map((res) => res.json())
    );

    return { success: true, assets };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

// Deletes by MediaAsset primary key
export async function deleteImage(assetId: number) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/assets/asset/${assetId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });

    if (!res.ok) return { success: false, error: "Failed to delete image" };
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete image" };
  }
}