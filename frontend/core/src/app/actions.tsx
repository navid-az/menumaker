"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

//types
import { SetupSchemaType } from "./(creator)/builder/components/setup/Setup";
import { BuilderFormType } from "./(creator)/builder/components/builder/Builder";
import { BranchFormType } from "./dashboard/components/CreateBranchForm";
import { BranchType } from "./dashboard/layout";

// import jwtDecoder from "@/lib/jwtDecoder";
// type DecodedJwtType = {
//   token_type: "access" | "refresh";
//   exp: number;
//   iat: number;
//   jti: string;
//   user_id: number;
// };

export async function createCookie(
  name: string,
  value: string,
  httpOnly = true
) {
  (await cookies()).set(name, value, { httpOnly: httpOnly });
  redirect("/");
}

type ItemType = {
  name: string;
  category: number;
};

export async function signInUser(data: {
  phone_number: string;
  otp: string;
  invitation_token?: string;
}) {
  try {
    const res = await fetch("http://localhost:8000/accounts/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (!res.ok) {
      console.error("Server error:", resData);
      throw new Error("Failed to fetch data");
    }
    return resData;
  } catch (err: any) {
    console.error("Fetch error:", err);
    throw new Error(err.detail || "Failed to fetch data");
  }
}

//logOut user
export async function logOut() {
  (await cookies()).delete("access");
  (await cookies()).delete("refresh");
  verifyToken();
  redirect("/");
}

//verify access token
export async function verifyToken() {
  const accessToken = (await cookies()).get("access");

  const res = await fetch("http://127.0.0.1:8000/accounts/token/verify/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken?.value }),
  });
  if (res.ok) {
    return true;
  } else {
    return false;
  }
}

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
      `http://localhost:8000/businesses/${businessSlug}/categories/`,
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
    const res = await fetch(`http://127.0.0.1:8000/categories/${categoryId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(data),
    });
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
    const res = await fetch(`http://127.0.0.1:8000/categories/${categoryId}/`, {
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
  const res = await fetch("http://127.0.0.1:8000/dashboard/items/");
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
      `http://127.0.0.1:8000/businesses/${businessSlug}/items/`,
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
      `http://127.0.0.1:8000/items/${itemId}/${
        branchSlug ? `?branch_slug=${branchSlug}` : ""
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
    const res = await fetch(`http://127.0.0.1:8000/items/${itemId}/`, {
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
      `http://localhost:8000/businesses/${businessSlug}/menu/`,
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

//create business
export async function createBusiness(data: SetupSchemaType) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch("http://localhost:8000/businesses/", {
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
      `http://localhost:8000/businesses/${business_slug}/branches/`,
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
    const res = await fetch(`http://localhost:8000/branches/${branch_slug}/`, {
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
      `http://localhost:8000/branches/${branch_slug}/tables/`,
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
    const res = await fetch(`http://localhost:8000/tables/${tableId}/`, {
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
    const res = await fetch(`http://localhost:8000/tables/${tableId}/`, {
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

// image upload
export async function uploadImage(data: FormData) {
  try {
    const res = await fetch("http://localhost:8000/menu/images/", {
      method: "POST",
      body: data,
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.log("errorData:", errorData);

      return {
        success: false,
        error: errorData.error || "Failed to upload image",
      };
    }

    const validData = await res.json();

    if (validData.success && Array.isArray(validData.image_refs)) {
      return {
        success: true,
        imageRefs: validData.image_refs,
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
