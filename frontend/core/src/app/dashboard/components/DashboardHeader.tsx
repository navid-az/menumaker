"use client";

import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { Menu, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <header className="flex h-max w-screen justify-between bg-primary p-4 lg:p-8">
      <section className="flex justify-between gap-2">
        <h2 className="font-extrabold text-primary-foreground lg:text-2xl">
          داشبورد مدیریت
        </h2>
        {isMobile && <Menu color="cyan"></Menu>}
      </section>
      <Button size="icon" className=" rounded-full bg-gray-400">
        <User2></User2>
      </Button>
    </header>
  );
}
