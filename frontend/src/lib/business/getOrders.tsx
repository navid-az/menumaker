//functions
import { cookies } from "next/headers";

//configs
import { SERVER_API_BASE_URL } from "../config";

//types
import { type Order } from "@/app/types/api/menu";

export default async function getOrders(branchSlug: string): Promise<Order[]> {
    const accessToken = (await cookies()).get("access");

    const data = await fetch(
        `${SERVER_API_BASE_URL}/branches/${branchSlug}/orders/`, {
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