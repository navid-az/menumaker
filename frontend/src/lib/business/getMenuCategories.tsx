//functions
import { cacheLife, cacheTag } from "next/cache";

//configs
import { SERVER_API_BASE_URL } from "../config";

//types 
import { type MenuCategory } from "@/app/types/api/menu";

//menu categories data
export default async function getMenuCategories(
    businessSlug: string
): Promise<MenuCategory[]> {
    'use cache'
    cacheLife('days')
    cacheTag(`business-categories-${businessSlug}`);

    const data = await fetch(
        `${SERVER_API_BASE_URL}/businesses/${businessSlug}/categories/`,
    );
    if (!data.ok) {
        throw new Error("Failed to fetch data");
    }

    return data.json();
}