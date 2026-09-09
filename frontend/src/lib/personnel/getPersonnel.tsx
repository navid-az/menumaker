//configs
import { SERVER_API_BASE_URL } from "../config";

//functions
import { cookies } from "next/headers";
import { cacheLife, cacheTag } from "next/cache";
import { Personnel } from "@/app/dashboard/personnel/columns";

export default async function getPersonnel(businessSlug: string, branchSlug: string): Promise<Personnel[]> {
    const accessToken = (await cookies()).get("access")?.value;
    if (!accessToken) return [];

    return getCachedPersonnel(accessToken, businessSlug, branchSlug);
}

async function getCachedPersonnel(accessToken: string, businessSlug: string, branchSlug: string): Promise<Personnel[]> {
    "use cache";
    cacheLife("weeks");
    cacheTag(`personnel-${businessSlug}-${branchSlug}`);

    try {
        const data = await fetch(
            `${SERVER_API_BASE_URL}/businesses/${businessSlug}/personnel/?branch_slug=${branchSlug}`,
            {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (!data.ok) {
            // const errorData = await data.json();
            throw new Error("Failed to fetch personnel data");
        }
        return await data.json();
    } catch (error) {
        console.log("Error fetching personnel data:", error);
        throw error;
    }
}