import React from "react";

//components
import LoginBanner from "./components/Banner";
import LocaleSwitcher from "@/components/global/LocalSwitcher";
import GoBackBtn from "@/components/global/GoBackBtn";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex h-screen w-screen bg-soft-blue">
      <header className="absolute z-50 top-0 flex h-max w-screen justify-end p-4 gap-2">
        <LocaleSwitcher size="sm" className="rounded-full h-8 w-12 bg-royal-green text-soft-blue hover:scale-110 scale-pro hover:bg-royal-green lg:hover:bg-soft-blue lg:bg-soft-blue lg:text-royal-green" />
        <GoBackBtn primaryColor="#edfdff" secondaryColor="#0f2c30"></GoBackBtn>
      </header>
      {children}
      <LoginBanner></LoginBanner>
    </section>
  );
}
