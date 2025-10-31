"use client";

//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import OrderList from "./OrderList";

//SVGs
import { ArrowLeft, ConciergeBell } from "lucide-react";

//provider
import { usePreview } from "@/app/(creator)/builder/components/preview/PreviewContext";

//types
import { type MenuItem } from "@/app/types/api/menu";
export type ValidItemType = { item: MenuItem; count?: number };
type CartPagePreview = {
  globalStyling: MenuGlobalStylingUI;
  isPreview?: boolean;
};

//libraries
import { cn } from "@/lib/utils";
import { MenuGlobalStylingUI } from "@/app/types/ui/menu";

export default function Cart({
  globalStyling,
  isPreview = false,
}: CartPagePreview) {
  const isDisabled = true;
  const { setActivePage } = usePreview();
  return (
    <div className="container flex h-full flex-col justify-between gap-8 p-4">
      <header className="flex items-center justify-between">
        <h3 className="text-lg text-(--primary)">لیست سفارشات</h3>
        <Button
          onClick={() => setActivePage("menu")}
          size="icon"
          className={cn(
            "rounded-(--radius-base) bg-[var(--waiter-btn-bg)] text-[var(--waiter-btn-text)] transition-all duration-300",
            globalStyling.style === "retro" &&
              "border-3 font-bold shadow-[4px_4px_0px_0px_var(--secondary)] border-(--secondary)"
          )}
        >
          <ArrowLeft
            className={cn(
              "text-(--secondary) transition-all duration-300",
              globalStyling.style === "retro" && "stroke-[2.5]"
            )}
          ></ArrowLeft>
        </Button>
      </header>
      {/* <OrderList data={data} globalStyling={globalStyling} /> */}
      <footer className="flex gap-4">
        <Button
          disabled={isDisabled}
          className={cn(
            "h-12 basis-9/12 rounded-(--radius-base) bg-(--primary) text-base text-(--secondary) transition-all duration-300",
            globalStyling.style === "retro" &&
              `border-3 border-(--secondary) ${!isDisabled && "shadow-[4px_4px_0px_0px_var(--secondary)]"}`
          )}
        >
          ثبت سفارش
        </Button>
        <Button
          size="icon"
          className={cn(
            "h-12 basis-3/12 rounded-(--radius-base) bg-(--primary) text-(--secondary) transition-all duration-300",
            globalStyling.style === "retro" &&
              "border-3 border-(--secondary) shadow-[4px_4px_0px_0px_var(--secondary)]"
          )}
        >
          <ConciergeBell />
        </Button>
      </footer>
    </div>
  );
}
