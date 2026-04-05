"use client";

import React from "react";

//components
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Star } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useProgress } from "@/app/hooks/useProgress";

//types
import { Subscription } from "@/app/types/api/subscription";
import { toPersianDigits } from "@/app/(menu)/[business_slug]/utilities/formatCurrency";

export default function SubscriptionPopOver({
  subscription,
}: {
  subscription: Subscription;
}) {
  const { progress } = useProgress(
    subscription.start_date,
    subscription.end_date,
    undefined,
    true
  );

  // Calculate subscription duration in months
  const start = new Date(subscription.start_date).getTime();
  const end = new Date(subscription.end_date).getTime();
  const durationInMonths = Math.floor((end - start) / 1000 / 60 / 60 / 24 / 30);

  type planType = "Franchiser" | "Pro" | "Basic";
  const plans: Record<
    planType,
    {
      title: string;
      color: string;
    }
  > = {
    Franchiser: { title: "فرنچایزر", color: "text-yellow-400" },
    Pro: { title: "پرو", color: "text-purple-400" },
    Basic: { title: "بیسیک", color: "text-cyan-400" },
  };

  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button
          className="bg-primary hover:bg-white/5 transition-all duration-300"
          size="icon"
        >
          <Star className="h-6 w-6"></Star>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 flex flex-col" align="end">
        <div className="w-full pb-2 border-b-2 border-gray-100">
          <p>وضعیت اشتراک</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-1 text-sm pt-2">
            <p>پلن</p>
            <p className={plans[subscription.plan.name].color}>
              {plans[subscription.plan.name].title}
            </p>
            <p>.</p>
            <p className="text-gray-600 font-normal">
              {toPersianDigits(durationInMonths)} ماهه
            </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="absolute flex flex-col items-center justify-center font-semibold mx-auto text-(--livecard-text)">
              <p className="text-center text-lg font-medium">
                {/* needs to change */}
                {toPersianDigits(245)} روز
              </p>
              <p className="text-xs font-normal">باقی مانده</p>
            </div>
            <ProgressBar size={140} progress={progress}></ProgressBar>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-normal text-gray-500">تاریخ شروع:</p>
            <p className="text-xs font-normal text-gray-500">تاریخ انقضا:</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
