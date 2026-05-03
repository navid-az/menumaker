"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Validate credentials(phoneNumber only) and generate an OTP
// Email validation will be added later on
export async function validateCredentials(credential: {
  phone_number?: string;
  email?: string;
}): Promise<{ retry_after: number; detail: string }> {
  try {
    const res = await fetch(
      "http://127.0.0.1:8000/accounts/validate-credential/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credential),
      }
    );
    const resData = await res.json();
    console.log(resData);
    if (!res.ok) {
      if (res.status === 429) {
        return { detail: resData.detail, retry_after: resData.retry_after };
      }
      return { detail: resData.detail, retry_after: resData.retry_after };
    }
    return { detail: resData.detail, retry_after: resData.retry_after };
  } catch (err: any) {
    console.error("Fetch error:", err);
    throw new Error(err.detail || "Failed to validate credentials");
  }
}

type ValidateOtpSuccess = {
  access: string;
  refresh: string;
};

type ValidateOtpError = { detail: string } | Record<string, string[]>;

// Validate otp
export async function validateOtp(data: {
  phone_number: string;
  otp: number;
  invitation_token?: string;
}): Promise<
  | { success: true; tokens: ValidateOtpSuccess }
  | { success: false; error: ValidateOtpError }
> {
  try {
    const res = await fetch("http://127.0.0.1:8000/accounts/validate-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: resData ?? { detail: "Unknown server error" },
      };
    }
    return {
      success: true,
      tokens: { access: resData.access, refresh: resData.refresh },
    };
  } catch (err) {
    return {
      success: false,
      error: { detail: "Network error. Please try again" },
    };
  }
}

// Cookie creator
// Specifically used for access & refresh tokens
export async function createCookie(
  name: string,
  value: string,
  httpOnly = true
) {
  (await cookies()).set(name, value, { httpOnly: httpOnly });
  redirect("/");
}

// LogOut user
//needs improvements !!!
export async function logOut() {
  (await cookies()).delete("access");
  (await cookies()).delete("refresh");
  verifyToken();
  redirect("/");
}

// Verify access token
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
