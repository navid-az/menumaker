import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fa"],
  defaultLocale: "fa",
  localePrefix: "never", // never show /fa or /en in the URL
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
  },
});
