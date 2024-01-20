"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createCookie(
  name: string,
  value: string,
  httpOnly: boolean = true
) {
  cookies().set(name, value, { httpOnly: httpOnly });

  redirect("/");
}
