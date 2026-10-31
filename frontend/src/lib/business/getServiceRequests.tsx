//functions
import { cookies } from "next/headers";

//configs
import { SERVER_API_BASE_URL } from "../config";

//types
import { type ServiceRequest } from "@/app/types/api/business";

export default async function getServiceRequests(branchSlug: string): Promise<ServiceRequest[]> {
    const accessToken = (await cookies()).get("access");

    const data = await fetch(
        `${SERVER_API_BASE_URL}/branches/${branchSlug}/service-requests/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken?.value}`,
        },
    }
    );
    if (!data.ok) {
        throw new Error("Failed to fetch data");
    }
    return data.json();
}