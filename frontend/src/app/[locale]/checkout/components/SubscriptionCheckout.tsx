import React from "react";

// components
import Image from "next/image";
import { SubscriptionPlan } from "@/app/types/api/subscription";
import PriceTag from "@/app/[locale]/(menu)/[business_slug]/(public-menu)/menu/components/PriceTag";
import CheckoutForm from "./CheckoutForm";

// functions
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/app/[locale]/(menu)/[business_slug]/utilities/formatCurrency";

const themeStyles: Record<
  string,
  {
    bg: string;
    border: string;
    accent: string;
    title: string;
    btn: string;
    shadow?: string;
    tag?: string;
  }
> = {
  basic: {
    bg: "bg-soft-blue",
    border: "border-royal-green/20 hover:border-royal-green",
    accent: "text-blue-700",
    title: "text-royal-green",
    btn: "text-soft-blue bg-royal-green",
  },
  pro: {
    bg: "bg-purple-50",
    border: "border-deep-purple/20 hover:border-deep-purple",
    accent: "text-purple-700",
    title: "text-deep-purple",
    btn: "text-purple-50 bg-deep-purple",
    shadow: "bg-purple-400 opacity-60",
    tag: "bg-deep-purple text-purple-200",
  },
  franchiser: {
    bg: "bg-yellow-50",
    border: "border-yellow-950/20 hover:border-yellow-950",
    accent: "text-amber-700",
    title: "text-yellow-950",
    btn: "bg-yellow-950 text-yellow-50",
    shadow: "bg-yellow-400 opacity-60",
  },
};

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";
import { getLocale, getTranslations } from "next-intl/server";
import { locale } from "next/root-params";

// Fetches plan data by slug from the backend API
async function getPlanData(planSlug: string) {
  const res = await fetch(
    `${SERVER_API_BASE_URL}/subscriptions/plans/${planSlug}`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch plan data");
  }
  return res.json();
}

export default async function SubscriptionCheckout({
  searchParams,
}: {
  searchParams: Promise<{
    business: string;
    plan: string;
    duration: number;
  }>;
}) {
  const {
    business: businessSlug,
    plan: planSlug,
    duration,
  } = await searchParams;

  const t = await getTranslations('checkout')

  const planData: SubscriptionPlan = await getPlanData(planSlug);
  const planPricing = planData.pricings.find((p) => p.duration == duration);

  const flatPrice = planPricing?.price || 0;
  const tax = flatPrice * 0.1; // 10% tax
  const discount =
    flatPrice * (planPricing?.discount ? planPricing.discount / 100 : 0);
  const total = flatPrice + tax - discount;
  const durationInMonths = duration / 30;

  return (
    <div className="flex flex-col bg-zinc-50 text-royal-green rounded-md p-4 w-full max-w-[470px] h-full max-h-[650px] gap-4 border border-primary/20 justify-between shadow-lg">
      <div className="flex flex-col gap-10">
        <p className="text-center text-xl md:text-2xl font-semibold">
          {t("title")}
        </p>

        <div className="flex flex-col gap-4">
          <PlanInfoTab
            planSlug={planSlug}
            name={planData.name}
            planDuration={durationInMonths}
            planPrice={flatPrice}
            durationLabels={{
              month: t("duration.month"),
              year: t("duration.year"),
            }}
          />

          {discount > 0 && (
            <ExpenseLine
              title={t("discount")}
              price={discount}
            />
          )}

          <ExpenseLine
            title={t("tax")}
            price={tax}
          />

          <ExpenseLine
            size="lg"
            title={t("total")}
            price={total}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>{t("paymentGateway")}</p>

          <div className="w-full flex gap-2 justify-start items-center bg-white p-1 border border-primary/20 rounded-md">
            <Image
              src="/images/zarinpal-logo.png"
              width={50}
              height={50}
              alt="zarinpal-logo"
            />
            <p className="text-2xl font-medium">{t('gateway')}</p>
          </div>
        </div>
      </div>

      <CheckoutForm planData={planData} />
    </div>
  );
}

export async function PlanInfoTab({
  name,
  planSlug,
  planDuration,
  planPrice,
  durationLabels,
}: {
  name: string;
  planSlug: string;
  planDuration: number;
  planPrice: number;
  durationLabels: {
    month: string;
    year: string;
  };
}) {

  const locale = await getLocale()
  const formatNumber = (number: number) => {
    if (locale === 'fa') {
      return toPersianDigits(number)
    } else {
      return number
    }
  }

  return (
    <div
      className={cn(
        themeStyles[planSlug].bg,
        themeStyles[planSlug].title,
        themeStyles[planSlug].border,
        "group overflow-hidden transition-all duration-600 hover:border-y-purple-950 relative flex px-3 md:px-4 py-2 justify-between rounded-full items-center border"
      )}
    >
      <div
        className={cn(
          themeStyles[planSlug].shadow,
          "size-24 blur-2xl rounded-full absolute inset-s-0 z-10 group-hover:size-52 group-hover:blur-3xl transition-all duration-600 ease-in"
        )}
      />
      <div className="flex gap-2 items-center z-40">
        <p className="text-lg font-black ltr:font-semibold">{locale === 'fa' ? name : planSlug}</p>

        <div
          className={cn(
            themeStyles[planSlug].btn,
            "rounded-full gap-1 text-xs font-normal flex justify-center items-center px-3 h-6"
          )}
        >
          <p>{planDuration === 12 ? formatNumber(1) : formatNumber(planDuration)}</p>

          <p>
            {planDuration === 12
              ? durationLabels.year
              : durationLabels.month}
          </p>
        </div>
      </div>

      <PriceTag price={planPrice} />
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
