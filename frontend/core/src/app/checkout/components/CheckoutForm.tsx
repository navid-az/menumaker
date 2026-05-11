import PriceTag from "@/app/(menu)/[business_slug]/(public-menu)/menu/components/PriceTag";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function CheckoutForm() {
  return (
    <div className="flex flex-col bg-soft-blue rounded-md p-4 w-full max-w-[470px] h-full max-h-[650px] gap-4 border border-sad-blue justify-between">
      <div className="flex flex-col gap-10">
        <p className="text-center text-xl md:text-2xl font-semibold">
          جزییات صورتحساب
        </p>
        <div className="flex flex-col gap-4">
          <PlanInfoTab
            planType="پرو"
            planDuration="12"
            planPrice={14000000}
          ></PlanInfoTab>
          <ExpenseLine title="تخفیف اشتراک" price={4200000}></ExpenseLine>
          <ExpenseLine
            title="مالیات بر ارزش افزوده"
            price={1420000}
          ></ExpenseLine>
          <ExpenseLine
            size="lg"
            title="مبلغ قابل پرداخت"
            price={19820000}
          ></ExpenseLine>
        </div>
        <div className="flex flex-col gap-2">
          <p>درگاه پرداخت</p>
          <div className="w-full flex gap-2 justify-start items-center bg-white p-1 border border-sad-blue rounded-md">
            <Image
              src={"/images/zarinpal-logo.png"}
              width={50}
              height={50}
              alt="zarinpal-logo"
            ></Image>
            <p className="text-2xl font-medium">زرین پال</p>
          </div>
        </div>
      </div>
      <Button
        className="bg-royal-green text-soft-blue text-xl font-semibold h-14 w-full"
        size="lg"
      >
        پرداخت
      </Button>
    </div>
  );
}

export function PlanInfoTab({
  planType,
  planDuration,
  planPrice,
}: {
  planType: string;
  planDuration: string;
  planPrice: number;
}) {
  return (
    <div className="group overflow-hidden transition-all duration-600 hover:border-y-purple-950 relative flex px-3 md:px-4 py-2 justify-between rounded-full bg-purple-100 text-purple-950 items-center border border-purple-950/10">
      <div
        className={cn(
          "size-24 blur-2xl rounded-full bg-purple-400/60 absolute right-0 z-10 group-hover:size-52 group-hover:blur-3xl transition-all duration-600 ease-in"
        )}
      />
      <div className="flex gap-2 md:gap-4 items-center z-40">
        <div className="flex gap-1 items-center">
          <p className="text-base font-light">اشتراک</p>
          <p className="text-lg font-black">{planType}</p>
        </div>
        <div className="rounded-full bg-purple-950 text-purple-50 gap-0.5 text-xs font-normal flex justify-center items-center px-4 h-6">
          <p>{planDuration}</p>
          <p>ماه</p>
        </div>
      </div>
      <PriceTag price={planPrice}></PriceTag>
    </div>
  );
}

export function ExpenseLine({
  price,
  title,
  size = "default",
}: {
  price: number;
  title: string;
  size?: "sm" | "default" | "lg";
}) {
  return (
    <div className="flex justify-between items-center px-3 md:px-4">
      <p
        className={cn(
          size === "sm"
            ? "text-sm font-light"
            : size === "default"
            ? "text-base font-normal"
            : size === "lg"
            ? "text-xl font-semibold"
            : ""
        )}
      >
        {title}
      </p>
      <PriceTag price={price} size={size}></PriceTag>
    </div>
  );
}
