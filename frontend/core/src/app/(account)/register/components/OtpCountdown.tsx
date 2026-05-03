"use client";

import React, { useEffect, useState } from "react";

//components
import { Button } from "@/components/ui/button";
import { toPersianDigits } from "@/app/(menu)/[business_slug]/utilities/formatCurrency";
import { formatTime } from "@/lib/formatTime";

//functions
import { cn } from "@/lib/utils";

export default function OtpCountdown({
  onClick,
  retryAfter,
  onFinish,
}: {
  onClick: () => void;
  retryAfter: number;
  onFinish: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(retryAfter);

  useEffect(() => {
    const remaining = Math.max(0, Math.floor((retryAfter - Date.now()) / 1000));
    setTimeLeft(remaining);
  }, [retryAfter]);

  useEffect(() => {
    console.log(timeLeft);

    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0 && onFinish) {
      onFinish();
    }
  }, [timeLeft, onFinish]);

  return (
    <Button
      onClick={onClick}
      disabled={timeLeft > 0}
      className="flex-1 hover:scale-105 transition-all duration-300 scale-pro bg-sad-blue border-royal-green/10 border-2 text-royal-green rounded-full"
    >
      <span
        className={cn(
          "transition-all duration-300",
          timeLeft > 0 ? "mr-0 opacity-100" : "-mr-[54px] opacity-0"
        )}
      >
        {toPersianDigits(formatTime(timeLeft * 1000))} تا
      </span>
      ارسال مجدد کد
    </Button>
  );
}
