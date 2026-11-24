"use client";

import React, { useState } from "react";

//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { toast } from "sonner";

//SVGs
import { ConciergeBell, House, LoaderCircle } from "lucide-react";

//types
import { type MenuGlobalStylingUI } from "@/app/types/ui/menu";
import { type MenuUI } from "@/app/types/ui/menu";

//libraries
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

//actions 
import { createServiceRequest } from "@/app/actions/menu/service-request";

//hooks
import { usePreview } from "@/app/[locale]/(creator)/builder/components/preview/PreviewContext";
import { useSearchParams } from "next/navigation";

export default function MenuHeader({
  globalStyling,
  menuData,
  businessSlug,
}: {
  globalStyling: MenuGlobalStylingUI;
  menuData: MenuUI;
  businessSlug?: string;
}) {
  const t = useTranslations('menu.pages.itemsPage.header')

  const [isCallingWaiter, setIsCallingWaiter] = useState(false);
  const [waiterRequestSubmitted, setWaiterRequestSubmitted] = useState(false);

  const isWaiterButtonDisabled = isCallingWaiter || waiterRequestSubmitted;

  async function callWaiter() {
    if (isWaiterButtonDisabled) return;

    const sessionCode = sessionStorage.getItem("session_code");

    if (!sessionCode) {
      toast.error(t("serviceRequest.toasts.noActiveSession"));
      return;
    }

    setIsCallingWaiter(true);

    try {
      const res = await createServiceRequest(sessionCode);

      if (!res.success) {
        toast.error(t('serviceRequest.toasts.error'));
        return;
      }

      setWaiterRequestSubmitted(true);
      toast.success(t("serviceRequest.toasts.waiterCalled"));
    } catch {
      toast.error(t("serviceRequest.toasts.errors.requestFailed"));
    } finally {
      setIsCallingWaiter(false);
    }
  }

  const searchParams = useSearchParams();
  const tableCode = searchParams.get("t");
  const branchSlug = searchParams.get("branch");


  const { isPreview, setActivePage } = usePreview();
  return (
    <section className={cn("flex w-full flex-col gap-4 rounded px-4 pt-4")}>
      <section className="flex items-center justify-between h-10 rtl:flex-row-reverse">
        <Button
          onClick={() => isPreview && setActivePage("home")}
          size="icon"
          className={cn(
            "rounded-(--radius-base) bg-[var(--waiter-btn-bg)] text-[var(--waiter-btn-text)] transition-all duration-300",
            globalStyling.style === "retro" &&
            "border-3 font-bold shadow-[4px_4px_0px_0px_var(--secondary)] border-(--secondary)"
          )}
        >
          {isPreview ? (
            <House
              className={cn(
                "text-(--secondary) size-5 transition-all duration-300",
                globalStyling.style === "retro" && "stroke-[2.5]"
              )}
            ></House>
          ) : (
            <Link
              href={`/home?branch=${branchSlug}&t=${tableCode}`}
            >
              <House
                className={cn(
                  "text-(--secondary) transition-all duration-300",
                  globalStyling.style === "retro" && "stroke-[2.5]"
                )}
              ></House>
            </Link>
          )}
        </Button>
        <div className="flex gap-2">
          {menuData.call_waiter_enabled && (
            <Button
              disabled={isWaiterButtonDisabled}
              onClick={() => !isPreview && callWaiter()}
              className={cn(
                "rounded-(--radius-base) border border-transparent bg-[var(--waiter-btn-bg)] text-[var(--waiter-btn-text)] transition-all duration-300",
                globalStyling.style === "retro" && [
                  "border-3 font-bold",
                  "border-(--secondary) shadow-[4px_4px_0px_0px_var(--secondary)]",
                  isWaiterButtonDisabled
                    ? "translate-x-1 translate-y-1 shadow-none"
                    : "active:translate-x-1 active:translate-y-1 active:shadow-none",
                ],
                isWaiterButtonDisabled &&
                globalStyling.style !== "retro" &&
                "cursor-not-allowed opacity-60",
              )}
            >
              {isCallingWaiter ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                <ConciergeBell
                  className={cn(
                    "size-5 text-(--secondary) transition-all duration-300",
                    globalStyling.style === "retro" && "stroke-[2.5]",
                  )}
                />
              )}

              {isCallingWaiter
                ? t("buttons.callingWaiter")
                : waiterRequestSubmitted
                  ? t("buttons.waiterRequested")
                  : t("buttons.waiter")}
            </Button>
          )}
        </div>
      </section>
      {menuData.searchbar_enabled && (
        <div className="flex gap-2">
          <SearchBar t={t} globalStyling={globalStyling}></SearchBar>
        </div>
      )}
    </section>
  );
}
