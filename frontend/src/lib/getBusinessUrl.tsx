//configs
import { APP_URL } from "./config";

export function getBusinessUrl(
    businessSlug: string,
    path: string = "/"
): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const platformUrl = new URL(APP_URL);

    return `https://${businessSlug}.${platformUrl.host}${normalizedPath}`;
}