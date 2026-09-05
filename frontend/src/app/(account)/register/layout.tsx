import React from "react";
import Link from "next/link";

//SVGs
import { ArrowLeft } from "lucide-react";

//components
import { Button } from "@/components/ui/button";
import LoginBanner from "./components/Banner";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex h-screen w-screen bg-soft-blue">
      <header className="absolute z-50 top-0 flex h-max w-screen justify-end p-4 gap-2 ">
        <Button
          size="sm"
          className="scale-pro rounded-full transition-all duration-300 bg-royal-green text-soft-blue hover:scale-105 lg:bg-soft-blue lg:text-royal-green"
          asChild
        >
          <Link href="/">
            <p className="text-sm">بازگشت</p>
            <ArrowLeft className="size-5"></ArrowLeft>
          </Link>
        </Button>
      </header>
      {children}
      <LoginBanner></LoginBanner>
    </section>
  );
}
