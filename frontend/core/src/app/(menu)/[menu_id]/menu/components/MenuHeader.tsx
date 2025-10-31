"use client";

import React from "react";

//components
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

//SVGs
import { ConciergeBell, House } from "lucide-react";

//types
import { type MenuGlobalStylingUI } from "@/app/types/ui/menu";
import { type MenuUI } from "@/app/types/ui/menu";

//libraries
import { cn } from "@/lib/utils";
import clsx from "clsx";

//provider
import { usePreview } from "@/app/(creator)/builder/components/preview/PreviewContext";

export default function MenuHeader({
  globalStyling,
  menuData,
}: {
  globalStyling: MenuGlobalStylingUI;
  menuData: MenuUI;
}) {
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

  const { setActivePage } = usePreview();
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
                "rounded-(--radius-base) border border-transparent bg-[var(--waiter-btn-bg)] text-[var(--waiter-btn-text)] transition-all duration-300",
                globalStyling.style === "retro" &&
                  "border-3 font-bold shadow-[4px_4px_0px_0px_var(--secondary)] border-(--secondary)"
              )}
            >
              <ConciergeBell
                className={cn(
                  "text-(--secondary) transition-all duration-300",
                  globalStyling.style === "retro" && "stroke-[2.5]"
                )}
              ></ConciergeBell>
              سالن دار
            </Button>
          )}
        </div>
        <Button
          onClick={() => setActivePage("home")}
          size="icon"
          className={clsx(
            "rounded-(--radius-base) bg-[var(--waiter-btn-bg)] text-[var(--waiter-btn-text)] transition-all duration-300",
            globalStyling.style === "retro" &&
              "border-3 font-bold shadow-[4px_4px_0px_0px_var(--secondary)] border-(--secondary)"
          )}
        >
          <House
            className={cn(
              "text-(--secondary) transition-all duration-300",
              globalStyling.style === "retro" && "stroke-[2.5]"
            )}
          ></House>
        </Button>
      </section>
      {menuData.searchbar_enabled && (
        <div className="flex gap-2">
          <SearchBar globalStyling={globalStyling}></SearchBar>
        </div>
      )}
    </section>
  );
}
