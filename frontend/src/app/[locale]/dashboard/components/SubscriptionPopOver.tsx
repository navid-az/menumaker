"use client";

import React, { useEffect, useState } from "react";

//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import ProgressBar from "./ProgressBar";

//SVGs
import { Star } from "lucide-react";

//hooks
import { useProgress } from "@/app/hooks/useProgress";

//libs
import { cn } from "@/lib/utils";

//functions
import { toPersianDigits } from "@/app/[locale]/(menu)/[business_slug]/utilities/formatCurrency";

//types
import { type Subscription } from "@/app/types/api/subscription";

//libraries
import { useTranslations } from "next-intl";

export default function SubscriptionPopOver({
  subscription,
  locale
}: {
  subscription: Subscription;
  locale: string
}) {
  const t = useTranslations('dashboard.header.subscriptionPopover')

  type planType = "franchiser" | "pro" | "basic";

  const plans: Record<planType, { color: string }> = {
    franchiser: { color: "text-yellow-400" },
    pro: { color: "text-purple-400" },
    basic: { color: "text-cyan-400" },
  };

  const { progress } = useProgress(
    subscription.start_date,
    subscription.end_date,
    undefined
  );
  const [reminder, setReminder] = useState(false);

  const start = new Date(subscription.start_date).getTime();
  const end = new Date(subscription.end_date).getTime();
  const now = new Date().getTime();

  // Calculate subscription duration in months
  const durationInMonths = Math.floor((end - start) / 1000 / 60 / 60 / 24 / 30);

  // Calculate when to nudge user to renew subscription
  //temporary , should be different for each plan duration
  const nudgeTime = Math.floor(((end - start) * 25) / 100);

  useEffect(() => {
    if (end - now <= nudgeTime) {
      setReminder(true);
    }
  }, [reminder]);

  // Calculate subscription's remaining days
  const daysLeft = Math.max(0, Math.ceil((end - now) / 86400000));

  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button
          className="bg-primary hover:bg-white/5 transition-all size-9 duration-300"
          size="icon"
        >
          <Star className="size-5"></Star>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 flex flex-col" align="end">
        <div className="w-full pb-2 border-b-2 border-gray-100">
          <p>{t('status')}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-1 text-sm pt-2">
            <p>{t("plan")}</p>
            <p className={plans[subscription.plan.slug].color}>
              {t(`plans.${subscription.plan.slug}`)}
            </p>
            <p>.</p>
            <p className="text-gray-600 font-normal">
              {t("duration", {
                months:
                  locale === "fa"
                    ? toPersianDigits(durationInMonths)
                    : durationInMonths,
              })}
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="absolute flex flex-col items-center justify-center font-semibold mx-auto text-(--livecard-text)">
              <p
                className={cn(
                  "text-center text-lg font-medium",
                  reminder && "text-red-600"
                )}
              >
                {t("days", { days: locale === "fa" ? toPersianDigits(daysLeft) : daysLeft })}
              </p>

              <p className="text-xs font-normal">
                {t("remaining")}
              </p>
            </div>
            <ProgressBar
              innerColor={reminder ? "oklch(57.7% 0.245 27.325)" : "#0f2c30"}
              size={140}
              progress={progress}
            ></ProgressBar>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-normal text-gray-500">
              {t("startDate")}
            </p>
            <p className="text-xs font-normal text-gray-500">
              {t("expirationDate")}
            </p>
          </div>

          {reminder && (
            <Button size="lg" asChild>
              <Link href="/pricing">
                <Star className="h-5 w-5" />
                <p>{t("renew")}</p>
              </Link>
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
