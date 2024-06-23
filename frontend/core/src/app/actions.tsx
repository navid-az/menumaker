"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

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
  cookies().set(name, value, { httpOnly: httpOnly });
  redirect("/");
}

type ItemType = {
  name: string;
  category: number;
};

//logOut user
export async function logOut() {
  cookies().delete("access");
  cookies().delete("refresh");
  verifyToken();
  redirect("/");
}

//verify access token
export async function verifyToken() {
  const accessToken = cookies().get("access");

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
export async function deleteCategory(menuSlug: string, categoryId: number) {
  const accessToken = cookies().get("access");

  const res = await fetch(
    `http://127.0.0.1:8000/menu/${menuSlug}/categories/${categoryId}/delete/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );
  if (!res.ok) {
    return new Error("wtf is this shit bro?");
  }
  revalidateTag("categories");
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
  const accessToken = cookies().get("access");

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

export async function deleteItem(menuSlug: string, itemId: number) {
  const accessToken = cookies().get("access");

  const res = await fetch(
    `http://127.0.0.1:8000/menu/${menuSlug}/items/${itemId}/delete/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    }
  );
  if (!res.ok) {
    return new Error("wtf is this shit bro?");
  }
  revalidateTag("items");
}
