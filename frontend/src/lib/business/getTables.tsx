//configs
import { SERVER_API_BASE_URL } from "../config";

export default async function getTables(businessSlug: string, branchSlug: string) {
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