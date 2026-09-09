//functions
import { cacheLife, cacheTag } from "next/cache";

//configs
import { SERVER_API_BASE_URL } from "../config";

//types
import { Branch } from "@/app/types/api/business";

export default async function getBranches(businessSlug: string): Promise<Branch[]> {
    'use cache'
    cacheLife('weeks')
    cacheTag(`business-branches-${businessSlug}`);

    const data = await fetch(
        `${SERVER_API_BASE_URL}/businesses/${businessSlug}/branches/`,
    );
    if (!data.ok) {
        throw new Error("Failed to fetch data");
    }
    return data.json();
}