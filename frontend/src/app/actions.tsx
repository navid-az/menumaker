"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

//types
import { SetupSchemaType } from "./(creator)/builder/components/setup/Setup";
import { BranchFormType } from "./dashboard/components/CreateBranchForm";
import { BuilderFormType } from "./(creator)/builder/components/builder/BuilderTest";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

// import jwtDecoder from "@/lib/jwtDecoder";
// type DecodedJwtType = {
//   token_type: "access" | "refresh";
//   exp: number;
//   iat: number;
//   jti: string;
//   user_id: number;
// };

//deprecated
// export async function signInUser(data: {
//   phone_number: string;
//   otp: string;
//   invitation_token?: string;
// }) {
//   try {
//     const res = await fetch("http://localhost:8000/accounts/token/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     const resData = await res.json();
//     if (!res.ok) {
//       console.error("Server error:", resData);
//       throw new Error("Failed to fetch data");
//     }
//     return resData;
//   } catch (err: any) {
//     console.error("Fetch error:", err);
//     throw new Error(err.detail || "Failed to fetch data");
//   }
// }

//~~~~dashboard table mutation-related actions~~~

export async function createCategory(
  businessSlug: string,
  data: {
    name?: string | undefined;
    icon?:
    | {
      name: string;
      id: number;
      image: string;
    }
    | null
    | undefined;
  }
) {
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
        body: JSON.stringify({ name: data.name, icon: data.icon?.id }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.error || "Failed to create category",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }

  revalidatePath(`/dashboard/${businessSlug}/data/categories`);
  return { success: true };
}

export async function updateCategory(
  businessSlug: string,
  categoryId: number,
  data: object
) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/categories/${categoryId}/`,
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
        error: errorData.error || "Failed to update category",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }

  revalidateTag("categories");
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
  revalidateTag("categories");
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

export async function createItem(businessSlug: string, data: FormData) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${businessSlug}/items/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
        },
        body: data,
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      console.log("errorData:", errorData);

      return {
        success: false,
        error: errorData.error,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }

  revalidatePath(`/dashboard/${businessSlug}/data/items`);
  return { success: true };
}

export async function updateItem(
  businessSlug: string,
  itemId: number,
  data: FormData,
  branchSlug?: string
) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/items/${itemId}/${branchSlug ? `?branch_slug=${branchSlug}` : ""
      }`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
        },
        body: data,
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      console.log("errorData:", errorData);

      return {
        success: false,
        error: errorData.error || "Failed to update item",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }

  revalidateTag("items");
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
  revalidateTag("items");
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
  business_slug: string
) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${business_slug}/branches/`,
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
    revalidateTag("branches");
    return { success: true, data: responseData };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function updateBranch(branch_slug: string, data: BranchFormType) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/branches/${branch_slug}/`, {
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
    revalidateTag("branches");
    return { success: true, data: responseData };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

// table actions
export async function createTable(data: any, branch_slug: string) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/branches/${branch_slug}/tables/`,
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
    revalidateTag("tables");
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
  branch_slug: string,
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
    revalidateTag("tables");
    return { success: true, data: responseData };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function deleteTable(branch_slug: string, tableId: number) {
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
  revalidateTag("tables");
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

// Pulls a readable message out of DRF's validation error shape, which
// returns field-keyed arrays (e.g. {"non_field_errors": ["Maximum of..."]})
// rather than a single "error"/"detail" key.
function extractErrorMessage(errorData: any): string {
  if (!errorData) return "Failed to upload image";
  if (typeof errorData === "string") return errorData;
  const firstKey = Object.keys(errorData)[0];
  const firstValue = errorData[firstKey];
  return Array.isArray(firstValue) ? firstValue[0] : String(firstValue);
}

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