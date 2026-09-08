//configs
import { SERVER_API_BASE_URL } from "../config";

//functions
import { cacheLife, cacheTag } from "next/cache";

export default async function getTables(businessSlug: string, branchSlug: string) {
    'use cache'
    cacheLife('weeks')
    cacheTag(`business-tables-${businessSlug}-${branchSlug}`);

    const res = await fetch(
        `${SERVER_API_BASE_URL}/branches/${branchSlug}/tables`
    );
    if (!res.ok) {
        throw new Error(
            `Failed to fetch asset groups: ${res.status} ${res.statusText}`
        );
    }
    return await res.json();
};