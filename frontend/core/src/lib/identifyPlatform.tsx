//types
export type PlatformTypes =
  | "Telegram"
  | "Instagram"
  | "Linkedin"
  | "Facebook"
  | "WhatsApp"
  | "Unknown";

//identifies the platform by given url
const identifyPlatform = (url: string): PlatformTypes => {
  if (url.includes("t.me") || url.includes("telegram.me")) {
    return "Telegram";
  } else if (url.includes("facebook.com")) {
    return "Facebook";
  } else if (url.includes("wa.me") || url.includes("web.whatsapp.com")) {
    return "WhatsApp";
  } else if (url.includes("instagram.com")) {
    return "Instagram";
  } else if (url.includes("/in/")) {
    return "Linkedin";
  } else {
    return "Unknown";
  }
};

export default identifyPlatform;
