import React from "react";

//components
import { Navbar } from "@/components/global/NavBar";
import Footer from "@/components/global/Footer";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
