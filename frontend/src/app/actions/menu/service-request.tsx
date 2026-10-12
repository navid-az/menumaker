"use server";

//functions
import { cookies } from "next/headers";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

export type ServiceRequestType =
    | "call_waiter"
    | "request_bill"
    | "request_water"
    | "request_cutlery"
    | "other";

async function parseResponse(res: Response) {
    const text = await res.text();

    try {
        return text ? JSON.parse(text) : {};
    } catch {
        return {};
    }
}

export async function createServiceRequest(
    sessionCode: string,
    requestType: ServiceRequestType = "call_waiter",
) {
    try {
        if (!sessionCode) {
            return {
                success: false,
                error: "An active table session is required.",
            };
        }

        const res = await fetch(
            `${SERVER_API_BASE_URL}/sessions/${encodeURIComponent(sessionCode)}/service-requests/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    request_type: requestType,
                }),
            },
        );

        const data = await parseResponse(res);

        if (!res.ok) {
            return {
                success: false,
                error:
                    data.detail ||
                    "Failed to create service request.",
                requestId: data.request_id,
            };
        }

        return {
            success: true,
            request: data.request,
        };
    } catch {
        return {
            success: false,
            error: "Unable to connect to the server. Please try again.",
        };
    }
}

export async function resolveServiceRequest(requestId: number) {
    try {
        const accessToken = (await cookies()).get("access")?.value;

        if (!accessToken) {
            return {
                success: false,
                error: "Authentication required.",
            };
        }

        const res = await fetch(
            `${SERVER_API_BASE_URL}/service-requests/${requestId}/`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            },
        );

        const data = await parseResponse(res);

        if (!res.ok) {
            return {
                success: false,
                error:
                    data.detail ||
                    "Failed to resolve service request.",
            };
        }

        return {
            success: true,
            request: data.request,
        };
    } catch {
        return {
            success: false,
            error: "Unable to connect to the server. Please try again.",
        };
    }
}
