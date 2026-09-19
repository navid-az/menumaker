import React from "react";

//components
import { Navbar } from "@/components/global/NavBar";
import Footer from "@/components/global/Footer";

//functions
import getLocale from "@/lib/i18n/getLocale";

export default async function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const locale = await getLocale()

  return (
    <div>
      <Navbar locale={locale}></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
