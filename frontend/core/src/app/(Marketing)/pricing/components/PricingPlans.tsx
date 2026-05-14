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

const plans = [
  {
    title: "بیسیک",
    pricing: [
      { months: 3, price: 2100000, discount: 0 },
      { months: 6, price: 4200000, discount: 10 }, // 10% discount
      { months: 12, price: 7300000, discount: 30 }, // 30% discount
    ],
    description: "شروعی راحت و بی دردسر برای مجموعه های کوچک و نوپا",
    features: ["سیستم هوشمند منو ساز", "ثبت بی‌نهایت آیتم و دسته‌بندی"],
    theme: "blue",
  },
  {
    title: "پرو",
    pricing: [
      { months: 3, price: 3900000, discount: 0 },
      { months: 6, price: 7800000, discount: 10 }, // 10% discount
      { months: 12, price: 14000000, discount: 30 }, // 22% discount
    ],
    description: "طراحی شده با توجه به نیاز های مجموعه هایی با یک یا چند شعبه",
    features: [
      "قابلیت ثبت و مدیریت چندین شعبه ",
      "مدیریت زنده شعب",
      "سیستم رزرواسیون",
      "قابلیت دریافت سفارش آنلاین",
      "ثبت اعضای مجموعه",
      "اعمال محدودیت و شخصی‌‌سازی دسترسی بر اساس سمت",
    ],
    popular: true,
    theme: "purple",
  },
  {
    title: "فرنچایزر",
    pricing: [
      { months: 3, price: 5500000, discount: 0 },
      { months: 6, price: 11000000, discount: 10 }, // 10% discount
      { months: 12, price: 19800000, discount: 30 }, // 22% discount
    ],
    description:
      "طراحی شده برای مجموعه های بزرگ با تمرکز بالا بر روی برندینگ و کیفیت خدمات‌دهی",
    features: [
      "مقایسه آمار فروش و نمودار شعب",
      "نمایش آمار و تحلیل شعب",
      "انبارداری هوشمند",
    ],
    popular: false,
    theme: "gold",
  },
];

type Theme = "blue" | "purple" | "gold";

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
  blue: {
    bg: "bg-soft-blue",
    border: "border-royal-green/20 hover:border-royal-green",
    accent: "text-blue-700",
    title: "text-royal-green",
    btn: "text-soft-blue bg-royal-green",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-deep-purple/20 hover:border-deep-purple",
    accent: "text-purple-700",
    title: "text-deep-purple",
    btn: "text-purple-50 bg-deep-purple",
    shadow: "bg-purple-400 opacity-60",
    tag: "bg-deep-purple text-purple-200",
  },
  gold: {
    bg: "bg-yellow-50",
    border: "border-yellow-950/20 hover:border-yellow-950",
    accent: "text-amber-700",
    title: "text-yellow-950",
    btn: "bg-yellow-950 text-yellow-50",
    shadow: "bg-yellow-400 opacity-60",
  },
};

export default function PricingPlans() {
  const [planDuration, setPlanDuration] = useState<3 | 6 | 12>(3);
  const getPlanPricing = (plan: (typeof plans)[0]) => {
    return plan.pricing.find((p) => p.months === planDuration)!;
  };

  return (
    <div className=" w-full flex flex-col gap-16 items-center mt-20">
      <div className="w-full flex gap-4 items-center">
        <Gem className="size-20 stroke-[1.5]"></Gem>
        <div className="flex flex-col gap-3">
          <h1 className="text-royal-green text-4xl font-bold">پلن ها</h1>
          <h3 className="text-gray-400 text-2xl font-normal">
            پلن‌های انعطاف‌پذیر متناسب با اندازه و نیاز کسب‌و‌کار شما
          </h3>
        </div>
      </div>
      <PlanDurationSelector
        planDuration={planDuration}
        setPlanDuration={setPlanDuration}
      ></PlanDurationSelector>
      <div className="flex w-full flex-wrap flex-col pb-20 lg:flex-row items-center justify-between gap-4">
        {plans.map((plan, index) => (
          <PlanCard
            className={cn(
              themeStyles[plan.theme].bg,
              themeStyles[plan.theme].title,
              themeStyles[plan.theme].border,
              plan.popular && "scale-100 2xl:scale-110"
            )}
            key={plan.title}
          >
            <PlanCardHeader>
              <div className="flex justify-between items-center">
                <PlanCardTitle>{plan.title}</PlanCardTitle>

                {plan.popular && (
                  <div
                    className={cn(
                      "px-4 py-1.5 rounded-full flex items-center",
                      themeStyles[plan.theme].tag
                    )}
                  >
                    <p className="text-sm font-normal">محبوب ترین</p>
                  </div>
                )}
              </div>
              <PlanCardDescription>{plan.description}</PlanCardDescription>
            </PlanCardHeader>
            <PlanCardPricing
              discount={getPlanPricing(plan).discount}
              price={getPlanPricing(plan).price}
            ></PlanCardPricing>
            <PlanCardContent>
              {index != 0 && (
                <div className="flex gap-2 items-center ">
                  <CheckCheck className="w-4 h-4"></CheckCheck>
                  <p className="text-sm font-medium">
                    تمام امکانات {plans[index - 1].title} به همراه:
                  </p>
                </div>
              )}
              <PlanCardFeatureList>
                {plan.features.map((feature, index) => (
                  <PlanCardFeature key={index}>{feature}</PlanCardFeature>
                ))}
              </PlanCardFeatureList>
              <PlanCardFeaturesSummery>
                <Palette className="w-5 h-5"></Palette>
                <Radio className="w-5 h-5"></Radio>
              </PlanCardFeaturesSummery>
            </PlanCardContent>
            <PlanCardFooter>
              <Button
                asChild
                size="lg"
                className={cn(
                  themeStyles[plan.theme].btn,
                  "w-full py-3 h-max cursor-pointer hover:scale-105 duration-500 transition-all scale-pro"
                )}
              >
                <Link href="/builder">فعالسازی اشتراک</Link>
              </Button>
            </PlanCardFooter>
            <PlanCardShadowEffect
              className={cn(themeStyles[plan.theme].shadow)}
            ></PlanCardShadowEffect>
          </PlanCard>
        ))}
        {/* <PlanCard className="bg-soft-blue text-royal-green border-royal-green/10 hover:border-royal-green/50">
          <PlanCardHeader>
            <PlanCardTitle>بیسیک</PlanCardTitle>
            <PlanCardDescription>
              شروعی راحت و بی دردسر برای مجموعه های کوچک و نوپا
            </PlanCardDescription>
          </PlanCardHeader>
          <PlanCardPricing price={1370000}></PlanCardPricing>
          <PlanCardContent>
            <PlanCardFeatureList>
              {plans[0].features.map((feature, index) => (
                <PlanCardFeature key={index}>{feature}</PlanCardFeature>
              ))}
            </PlanCardFeatureList>
            <PlanCardFeaturesSummery>
              <Palette className="w-5 h-5"></Palette>
              <Radio className="w-5 h-5"></Radio>
            </PlanCardFeaturesSummery>
          </PlanCardContent>
          <PlanCardFooter>
            <Button
              asChild
              size="lg"
              className="w-full py-3 h-max bg-royal-green text-soft-blue cursor-pointer hover:scale-105 duration-500 transition-all scale-pro"
            >
              <Link href="/builder">فعالسازی اشتراک</Link>
            </Button>
          </PlanCardFooter>
        </PlanCard>
        <PlanCard className="bg-purple-100 2xl:scale-110 text-[#2C0065] border-[#2C0065]/10 hover:border-[#2C0065]/50">
          <PlanCardHeader>
            <PlanCardTitle>پرو</PlanCardTitle>
            <PlanCardDescription>
              طراحی شده با توجه به نیاز های مجموعه هایی با یک یا چند شعبه
            </PlanCardDescription>
          </PlanCardHeader>
          <PlanCardPricing
            price={4250000}
            discount={planDuration === 12 ? 30 : 0}
          ></PlanCardPricing>
          <PlanCardContent>
            <div className="flex gap-2 items-center">
              <CheckCheck className="w-4 h-4"></CheckCheck>
              <p className="text-sm font-medium">
                تمام امکانات بیسیک به همراه:
              </p>
            </div>
            <PlanCardFeatureList>
              {plans[1].features.map((feature, index) => (
                <PlanCardFeature key={index}>{feature}</PlanCardFeature>
              ))}
            </PlanCardFeatureList>
            <PlanCardFeaturesSummery>
              <Palette className="w-5 h-5"></Palette>
              <Radio className="w-5 h-5"></Radio>
              <CalendarClock className="w-5 h-5"></CalendarClock>
              <ClipboardList className="w-5 h-5"></ClipboardList>
              <ShieldCheck className="w-5 h-5"></ShieldCheck>
            </PlanCardFeaturesSummery>
          </PlanCardContent>
          <PlanCardFooter>
            <Button
              asChild
              size="lg"
              className="w-full py-3 h-max bg-[#2C0065] text-purple-100 cursor-pointer hover:scale-105 duration-500 transition-all scale-pro"
            >
              <Link href="/builder">فعالسازی اشتراک</Link>
            </Button>
          </PlanCardFooter>
          <PlanCardShadowEffect className="bg-purple-400 opacity-60"></PlanCardShadowEffect>
        </PlanCard>
        <PlanCard className="bg-yellow-50 text-yellow-950 border-yellow-950/10 hover:border-yellow-950/50">
          <PlanCardHeader>
            <PlanCardTitle>فرنچایزر</PlanCardTitle>
            <PlanCardDescription>
              طراحی شده برای مجموعه های بزرگ با تمرکز بالا بر روی برندینگ و
              کیفیت خدمات‌دهی
            </PlanCardDescription>
          </PlanCardHeader>
          <PlanCardPricing
            price={14200000}
            discount={planDuration === 12 ? 30 : 0}
          ></PlanCardPricing>
          <PlanCardContent>
            <div className="flex gap-2 items-center ">
              <CheckCheck className="w-4 h-4"></CheckCheck>
              <p className="text-sm font-medium">تمام امکانات پرو به همراه:</p>
            </div>
            <PlanCardFeatureList>
              {plans[2].features.map((feature, index) => (
                <PlanCardFeature key={index}>{feature}</PlanCardFeature>
              ))}
            </PlanCardFeatureList>
            <PlanCardFeaturesSummery>
              <Palette className="w-5 h-5"></Palette>
              <Radio className="w-5 h-5"></Radio>
              <CalendarClock className="w-5 h-5"></CalendarClock>
              <ClipboardList className="w-5 h-5"></ClipboardList>
              <ShieldCheck className="w-5 h-5"></ShieldCheck>
              <ChartColumn className="w-5 h-5"></ChartColumn>
              <Boxes className="w-5 h-5"></Boxes>
            </PlanCardFeaturesSummery>
          </PlanCardContent>
          <PlanCardFooter>
            <Button
              asChild
              size="lg"
              className="w-full py-3 h-max bg-yellow-950 text-yellow-50 cursor-pointer hover:scale-105 duration-500 transition-all scale-pro"
            >
              <Link href="/builder">فعالسازی اشتراک</Link>
            </Button>
          </PlanCardFooter>
          <PlanCardShadowEffect className="bg-yellow-400 opacity-60"></PlanCardShadowEffect>
        </PlanCard> */}
      </div>
    </div>
  );
}

function PlanDurationSelector({
  planDuration,
  setPlanDuration,
}: {
  planDuration: 3 | 6 | 12;
  setPlanDuration: React.Dispatch<React.SetStateAction<3 | 6 | 12>>;
}) {
  return (
    <div className="w-4/12 flex gap-1.5 bg-gray-100 border-2 border-royal-green/20 p-1.5 rounded-full mt-12">
      <Button
        onClick={() => setPlanDuration(3)}
        size="lg"
        className={cn(
          "flex-1 rounded-full bg-soft-blue text-lg font-medium h-12 transition-all duration-300 text-royal-green border-2 border-royal-green/20",
          planDuration === 3 && "bg-royal-green text-soft-blue"
        )}
      >
        ۳ ماهه
      </Button>
      <Button
        onClick={() => setPlanDuration(6)}
        size="lg"
        className={cn(
          "flex-1 rounded-full bg-soft-blue text-lg font-medium h-12 transition-all duration-300 text-royal-green border-2 border-royal-green/20",
          planDuration === 6 && "bg-royal-green text-soft-blue"
        )}
      >
        ۶ ماهه
      </Button>
      <Button
        onClick={() => setPlanDuration(12)}
        size="lg"
        className={cn(
          "flex-1 rounded-full bg-soft-blue text-lg font-medium h-12 transition-all duration-300 text-royal-green border-2 border-royal-green/20",
          planDuration === 12 && "bg-royal-green text-soft-blue"
        )}
      >
        ۱۲ ماهه
      </Button>
    </div>
  );
}
