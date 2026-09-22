import { normalizeTime } from "./normalizeTime";
import { toPersianDigits } from "@/app/[locale]/(menu)/[business_slug]/utilities/formatCurrency";

type Locale = "fa" | "en";

export const formatElapsedTime = (
  ms: number,
  locale: Locale = "en"
): string => {
  const { hours, minutes, seconds } = normalizeTime(ms);

  const formatted = hours > 0
    ? `${hours}${locale === "fa" ? "س" : "h"} ${minutes}${locale === "fa" ? "د" : "m"}`
    : minutes > 0
      ? `${minutes}${locale === "fa" ? "د" : "m"} ${seconds}${locale === "fa" ? "ث" : "s"}`
      : `${seconds} ${locale === "fa" ? "ثانیه" : "seconds"}`;

  return locale === "fa" ? toPersianDigits(formatted) : formatted;
};