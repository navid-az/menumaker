//functions
import { cacheLife, cacheTag } from "next/cache";

//configs
import { SERVER_API_BASE_URL } from "../config";

//types
import { MenuItem } from "@/app/types/api/menu";

export default async function getMenuItems(
    businessSlug: string,
    branchSlug: string,
    scope?: 'visible' | 'hidden'
): Promise<MenuItem[]> {
    'use cache'
    cacheLife('days')
    cacheTag(`business-items-${businessSlug}`);

    const data = await fetch(
        `${SERVER_API_BASE_URL}/businesses/${businessSlug}/items/?branch_slug=${branchSlug}${scope && `&scope=${scope}`}`,
    );
    if (!data.ok) {
        throw new Error("Failed to fetch data");
    }
    return data.json();
}