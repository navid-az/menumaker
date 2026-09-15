import { getRequestConfig } from "next-intl/server";
import getLocale from "@/lib/i18n/getLocale";

export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const locale = await getLocale();

  console.log(locale);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
