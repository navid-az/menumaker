import React from "react";
import Link from "next/link";

//SVGs
import { ArrowLeft } from "lucide-react";

//components
import { Button } from "@/components/ui/button";
import LoginBanner from "./components/Banner";
import LocaleSwitcher from "@/components/global/LocalSwitcher";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex h-screen w-screen bg-soft-blue">
      <header className="absolute z-50 top-0 flex h-max w-screen justify-end p-4 gap-2 ">
        <LocaleSwitcher className="rounded-full w-12 h-9 bg-royal-green text-soft-blue hover:scale-110 scale-pro hover:bg-royal-green lg:hover:bg-soft-blue lg:bg-soft-blue lg:text-royal-green" />
        <Button
          size="sm"
          className="group scale-pro rounded-full transition-all duration-300 bg-royal-green text-soft-blue hover:scale-110 scale-pro lg:bg-soft-blue lg:text-royal-green"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="rotate-180 rtl:rotate-0 transition-all duration-300 scale-pro group-hover:scale-90"></ArrowLeft>
          </Link>
        </Button>
      </header>
      {children}
      <LoginBanner></LoginBanner>
    </section>
  );
}
