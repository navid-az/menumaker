"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

// Validate credentials(phoneNumber only) and generate an OTP
// Email validation will be added later on
export async function validateCredentials(credential: {
  phone_number?: string;
  email?: string;
}): Promise<{ retry_after: number; code?: number, detail: string }> {
  try {
    const res = await fetch(
      `${SERVER_API_BASE_URL}/accounts/validate-credential/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credential),
      }
    );
    const resData = await res.json();

    if (!res.ok) {
      if (res.status === 429) {
        return { detail: resData.detail, retry_after: resData.retry_after };
      }
      return { detail: resData.detail, retry_after: resData.retry_after };
    }
    return {
      detail: resData.detail,
      retry_after: resData.retry_after,
      code: resData.code,
    };
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
    const res = await fetch(`${SERVER_API_BASE_URL}/accounts/validate-code`, {
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
export async function createAuthCookies(
  access: string,
  refresh: string
) {
  const cookieStore = await cookies();

  cookieStore.set("access", access, {
    httpOnly: true,
  });

  cookieStore.set("refresh", refresh, {
    httpOnly: true,
  });

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

  const res = await fetch(`${SERVER_API_BASE_URL}/accounts/token/verify/`, {
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

// Refresh access token using refresh token
export async function refreshToken() {
  const refresh = (await cookies()).get("refresh")?.value;

  const res = await fetch(`${SERVER_API_BASE_URL}/accounts/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refresh }),
  });
  if (!res.ok) {
    return { success: false, detail: "Can't refresh the given token" };
  }

  // Update token
  const data = await res.json();

  console.log("new access:", data.access);

  // Set new access token
  (await cookies()).set({
    httpOnly: true,
    name: "access",
    value: data.access,
  });
  return { success: true, refreshed_token: data.access };
}

// Create a demo user to bypass auth system
// ONLY FOR REVIEWERS !!!
export async function createDemoUser(): Promise<
  | { success: true; tokens: ValidateOtpSuccess }
  | { success: false; error: ValidateOtpError }
> {
  try {
    const res = await fetch(`${SERVER_API_BASE_URL}/accounts/user/demo/`, {
      method: "POST",
    });

    const resData = await res.json();
    console.log(resData, resData.access, resData.refresh);

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
