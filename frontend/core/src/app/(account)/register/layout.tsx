"use client";

import React from "react";
import Link from "next/link";

//SVGs
import { ArrowLeft } from "@/app/components/svgs";

//components
import { Button } from "@/components/ui/button";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import LoginBanner from "./components/Banner";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen w-screen bg-soft-blue">
      <header className="absolute top-0 flex h-max w-screen justify-end p-4">
        <Button
          size="sm"
          className="scale-pro rounded-full transition-all hover:scale-105 lg:bg-primary-foreground lg:text-primary"
          asChild
        >
          <Link href="/">
            <p className="text-sm">بازگشت</p>
            <ArrowLeft className="mr-2 h-5 w-5"></ArrowLeft>
          </Link>
        </Button>
      </header>
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
      <LoginBanner></LoginBanner>
    </section>
  );
}
