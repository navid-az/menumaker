"use client";

import React, { useState } from "react";

//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PlanCard,
  PlanCardHeader,
  PlanCardTitle,
  PlanCardDescription,
  PlanCardPricing,
  PlanCardContent,
  PlanCardFeatureList,
  PlanCardFeature,
  PlanCardFooter,
  PlanCardFeaturesSummery,
  PlanCardShadowEffect,
} from "./PlanCard";

//functions
import { cn } from "@/lib/utils";

//SVGs
import {
  CalendarClock,
  CheckCheck,
  Palette,
  Radio,
  ClipboardList,
  ShieldCheck,
  ChartColumn,
  Boxes,
  Gem,
} from "lucide-react";

//types
import { type SubscriptionPlan } from "@/app/types/api/subscription";

//libraries
import { _Translator, useLocale, useTranslations } from "next-intl";

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

export default function PricingPlans({
  businessSlug,
  plans,
  isCompact = false,
}: {
  businessSlug?: string;
  plans: SubscriptionPlan[];
  isCompact?: boolean;
}) {

  // static data for plans
  const locale = useLocale()
  const t = useTranslations("pricing");

  const planStaticData = [
    {
      slug: "basic",
      title: t("plans.basic.title"),
      description: t("plans.basic.description"),
      features: t.raw("plans.basic.features"),
    },
    {
      slug: "pro",
      title: t("plans.pro.title"),
      description: t("plans.pro.description"),
      features: t.raw("plans.pro.features"),
      popular: true,
    },
    {
      slug: "franchiser",
      title: t("plans.franchiser.title"),
      description: t("plans.franchiser.description"),
      features: t.raw("plans.franchiser.features"),
      popular: false,
      theme: "gold",
    },
  ];

  const [planDuration, setPlanDuration] = useState<90 | 180 | 360>(90);

  return (
    <div className="w-full flex flex-col gap-16 items-center">
      <PlanDurationSelector
        planDuration={planDuration}
        setPlanDuration={setPlanDuration}
        t={t}
      ></PlanDurationSelector>
      <div
        className={cn(
          "flex w-full flex-wrap flex-col pb-20 lg:flex-row items-center gap-4",
          isCompact ? "justify-center" : " justify-between"
        )}
      >
        {planStaticData.map((plan, index) => {
          const dynamicPlan = plans.find((p) => p.slug === plan.slug);
          const planPricing = dynamicPlan?.pricings.find(
            (p) => p.duration === planDuration
          );
          return (
            <PlanCard
              isCompact={isCompact}
              className={cn(
                themeStyles[plan.slug].bg,
                themeStyles[plan.slug].title,
                themeStyles[plan.slug].border,
                plan.popular && !isCompact && "scale-100 2xl:scale-110"
              )}
              key={plan.title}
            >
              <div className="flex flex-col gap-5">
                <PlanCardHeader>
                  <div className="flex justify-between items-center">
                    <PlanCardTitle>{plan.title}</PlanCardTitle>

                    {plan.popular && (
                      <div
                        className={cn(
                          "px-4 py-1.5 rounded-full flex items-center",
                          themeStyles[plan.slug].tag
                        )}
                      >
                        <p className="text-sm font-normal">{t('popularBadge')}</p>
                      </div>
                    )}
                  </div>
                  <PlanCardDescription>{plan.description}</PlanCardDescription>
                </PlanCardHeader>
                <PlanCardPricing
                  discount={planPricing?.discount}
                  price={planPricing?.price}
                ></PlanCardPricing>
                {!isCompact && (
                  <PlanCardContent>
                    {index != 0 && plans.length > 0 && (
                      <div className="flex gap-2 items-center ">
                        <CheckCheck className="w-4 h-4"></CheckCheck>
                        <p className="text-sm font-medium">
                          {t("inheritedFeatures", { plan: locale === 'fa' ? plans[index - 1].name : plans[index - 1].slug })}
                        </p>
                      </div>
                    )}
                    <PlanCardFeatureList>
                      {plan.features.map((feature, index) => (
                        <PlanCardFeature key={index}>{feature}</PlanCardFeature>
                      ))}
                    </PlanCardFeatureList>
                    <PlanCardFeaturesSummery t={t}>
                      <Palette className="w-5 h-5"></Palette>
                      <Radio className="w-5 h-5"></Radio>
                    </PlanCardFeaturesSummery>
                  </PlanCardContent>
                )}
              </div>
              <PlanCardFooter>
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    themeStyles[plan.slug].btn,
                    "w-full py-3 h-max cursor-pointer hover:scale-105 duration-500 transition-all scale-pro z-20 relative"
                  )}
                >
                  <Link
                    href={
                      isCompact
                        ? `/checkout?${businessSlug ? `business=${businessSlug}&` : ""
                        }plan=${plan.slug}&duration=${planDuration}`
                        : "/builder"
                    }
                  >
                    {t("activate")}
                  </Link>
                </Button>
              </PlanCardFooter>
              <PlanCardShadowEffect
                className={cn(themeStyles[plan.slug].shadow)}
              ></PlanCardShadowEffect>
            </PlanCard>
          );
        })}
      </div>
    </div>
  );
}

function PlanDurationSelector({
  planDuration,
  setPlanDuration,
  t
}: {
  planDuration: 90 | 180 | 360;
  setPlanDuration: React.Dispatch<React.SetStateAction<90 | 180 | 360>>;
  t: _Translator<Record<string, any>, "pricing">
}) {
  return (
    <div className="w-max flex gap-1.5 bg-gray-100 border-2 border-royal-green/20 p-1.5 rounded-full mt-12">
      <Button
        onClick={() => setPlanDuration(90)}
        size="lg"
        className={cn(
          "flex-1 rounded-full bg-soft-blue text-lg font-medium h-12 transition-all duration-300 text-royal-green border-2 border-royal-green/20",
          planDuration === 90 && "bg-royal-green text-soft-blue"
        )}
      >
        {t("duration.months3")}
      </Button>
      <Button
        onClick={() => setPlanDuration(180)}
        size="lg"
        className={cn(
          "flex-1 rounded-full bg-soft-blue text-lg font-medium h-12 transition-all duration-300 text-royal-green border-2 border-royal-green/20",
          planDuration === 180 && "bg-royal-green text-soft-blue"
        )}
      >
        {t("duration.months6")}
      </Button>
      <Button
        onClick={() => setPlanDuration(360)}
        size="lg"
        className={cn(
          "flex-1 rounded-full bg-soft-blue text-lg font-medium h-12 transition-all duration-300 text-royal-green border-2 border-royal-green/20",
          planDuration === 360 && "bg-royal-green text-soft-blue"
        )}
      >
        {t("duration.months12")}
      </Button>
    </div>
  );
}
