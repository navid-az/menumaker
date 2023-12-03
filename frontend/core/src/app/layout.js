import "./globals.css";
import { cn } from "@/lib/utils";

import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const vazir = localFont({
  src: "/fonts/Vazirmatn-RD[wght].woff2",
  display: "swap",
  variable: "--font-vazir",
});

export const metadata = {
  title: "menumaker | home",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-soft-blue font-vazir overflow-x-hidden font-medium",
          vazir.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
