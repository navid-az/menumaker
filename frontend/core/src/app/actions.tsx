"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

//types
import { SetupSchemaType } from "./(creator)/builder/components/setup/Setup";
import { BuilderFormType } from "./(creator)/builder/components/builder/Builder";

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

//CATEGORY ACTIONS
type IconType = {
  id: number;
  name: string;
  image: string;
};

export async function createCategory(
  businessSlug: string,
  data: { name: string; icon?: IconType } | { name?: string; icon: IconType }
) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch(
      `http://localhost:8000/business/${businessSlug}/categories/create/`,
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
  menuSlug: string,
  categoryId: number,
  data: object
) {
  const accessToken = (await cookies()).get("access");

  const res = await fetch(
    `http://127.0.0.1:8000/menu/${menuSlug}/categories/${categoryId}/update/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(data),
    }
  );
  revalidateTag("categories");
  return res.ok;
}

export async function deleteCategory(businessSlug: string, categoryId: number) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/business/${businessSlug}/categories/${categoryId}/delete/`,
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
  const res = await fetch("http://127.0.0.1:8000/dashboard/items/");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function createItem(data: ItemType) {
  const res = await fetch("http://127.0.0.1:8000/menu/venhan/items/create/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log("HEADERS:", res.headers);
  const items = await res.json();

  return items;
}

export async function updateItem(
  menuSlug: string,
  itemId: number,
  data: object
) {
  const accessToken = (await cookies()).get("access");

  const res = await fetch(
    `http://127.0.0.1:8000/menu/${menuSlug}/items/${itemId}/update/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(data),
    }
  );
  revalidateTag("items");
  return res.ok;
}

export async function deleteItem(businessSlug: string, itemId: number) {
  const accessToken = (await cookies()).get("access");
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/business/${businessSlug}/items/${itemId}/delete/`,
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

type MenuType = Omit<BuilderFormType, "global_styling" | "business"> & {
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
      `http://localhost:8000/menu/create/${businessSlug}/`,
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
export async function createBusiness(prevState: any, data: SetupSchemaType) {
  const accessToken = (await cookies()).get("access");

  try {
    const res = await fetch("http://localhost:8000/business/create/", {
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
