
//functions
import { cookies } from "next/headers";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

export async function getAssetGroups(kind?: "icon" | "pattern") {
    const accessToken = (await cookies()).get("access");
    const query = kind ? `?kind=${kind}` : "";

    const res = await fetch(`${SERVER_API_BASE_URL}/assets/group/${query}`, {
        headers: { Authorization: `Bearer ${accessToken?.value}` },
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch asset groups: ${res.status} ${res.statusText}`);
    }

    return res.json();
}