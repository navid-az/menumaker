export function formatDateTime(
    date: string | Date,
    locale: string
): string {
    return new Intl.DateTimeFormat(
        locale === "fa" ? "fa-IR-u-ca-persian" : "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    ).format(new Date(date));
}