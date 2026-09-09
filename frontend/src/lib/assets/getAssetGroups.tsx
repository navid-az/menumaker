
//functions
import { cacheLife, cacheTag } from "next/cache";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

export default async function getAssetGroups(kind?: "icon" | "pattern") {
    'use cache'
    cacheLife('weeks')

    const query = kind ? `?kind=${kind}` : "";

    const res = await fetch(`${SERVER_API_BASE_URL}/assets/group/${query}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch asset groups: ${res.status} ${res.statusText}`);
    }

    return res.json();
}