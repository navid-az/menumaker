"use client";

import React from "react";

//components
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

//SVGs
import { AlignLeft, ConciergeBell } from "lucide-react";

//types
import { type MenuUI } from "@/app/types/ui/menu";

//libraries
import { cn } from "@/lib/utils";
import clsx from "clsx";

export default function MenuHeader({ menuData }: { menuData: MenuUI }) {
  async function callWaiter() {
    const sessionCode = sessionStorage.getItem("session_code");
    const res = await fetch(
      `http://127.0.0.1:8000/business/table-sessions/${sessionCode}/call-waiter/create/`,
      { method: "POST" }
    );
    if (!res.ok) {
      console.error("wtf just happened");
    }
  }
  const style = "retro";
  return (
    <section
      className={cn(
        "flex w-full flex-col gap-4 rounded px-4 pt-4"
        // isPreview && "mt-12"
      )}
    >
      <section className="flex items-center justify-between h-10">
        <div className="flex gap-2">
          {menuData.call_waiter_enabled && (
            <Button
              onClick={() => callWaiter()}
              className={clsx(
                "rounded-(--radius-base) bg-(--primary) text-(--secondary)",
                style === "retro" &&
                  "border-3 font-bold shadow-[4px_4px_0px_0px_var(--secondary)] border-(--secondary)"
              )}
            >
              <ConciergeBell></ConciergeBell>
              سالن دار
            </Button>
          )}
        </div>
        <AlignLeft
          className={cn("ml-2 text-(--primary)", "stroke-3")}
        ></AlignLeft>
      </section>
      <div className="flex gap-2">
        {menuData.searchbar_enabled && <SearchBar></SearchBar>}
      </div>
    </section>
  );
}
