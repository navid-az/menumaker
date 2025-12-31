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
} from "./components/PlanCard";

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
} from "lucide-react";

const plans = [
  {
    title: "بیسیک",
    price: 1370000,
    description: "شروعی راحت و بی دردسر برای مجموعه های کوچک و نوپا",
    features: ["سیستم هوشمند منو ساز", "ثبت بی‌نهایت آیتم و دسته‌بندی"],
    theme: "blue",
  },
  {
    title: "پرو",
    price: 3420000,
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
    title: "فرنجایزر",
    price: 14200000,
    description:
      "طراحی شده برای مجموعه های بزرگ با تمرکز بالا بر روی برندینگ و کیفیت خدمات‌دهی",
    features: [
      "مقایسه آمار فروش و نمودار شعب",
      "نمایش آمار و تحلیل شعب",
      "انبارداری هوشمند",
    ],
    popular: true,
    theme: "gold",
  },
];

export default async function page() {
  return (
    <div className="flex flex-col items-center container mx-auto justify-center px-4 sm:px-6 lg:px-0 xl:px-16 2xl:gap-16 2xl:px-44 w-full gap-4 lg:flex-row py-20">
      <PlanCard className="bg-soft-blue text-royal-green border-royal-green/10 hover:border-royal-green/50">
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
        <PlanCardPricing price={4250000}></PlanCardPricing>
        <PlanCardContent>
          <div className="flex gap-2 items-center">
            <CheckCheck className="w-4 h-4"></CheckCheck>
            <p className="text-sm font-medium">تمام امکانات بیسیک به همراه:</p>
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
        <PlanCardShadowEffect className="bg-purple-500 opacity-60"></PlanCardShadowEffect>
      </PlanCard>
      <PlanCard className="bg-yellow-50 text-yellow-950 border-yellow-950/10 hover:border-yellow-950/50">
        <PlanCardHeader>
          <PlanCardTitle>فرنچایزر</PlanCardTitle>
          <PlanCardDescription>
            طراحی شده برای مجموعه های بزرگ با تمرکز بالا بر روی برندینگ و کیفیت
            خدمات‌دهی
          </PlanCardDescription>
        </PlanCardHeader>
        <PlanCardPricing price={14200000}></PlanCardPricing>
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
        <PlanCardShadowEffect className="bg-yellow-500 opacity-60"></PlanCardShadowEffect>
      </PlanCard>
    </div>
  );
}

{
  /* mapping strategy  */
}
{
  /* {plans.map((plan, index) => (
        <PlanCard theme={plan.theme} key={index}>
          <PlanCardHeader>
            <PlanCardTitle>{plan.title}</PlanCardTitle>
            <PlanCardDescription>{plan.description}</PlanCardDescription>
          </PlanCardHeader>
          <PlanCardPricing
            theme={plan.theme}
            price={plan.price}
          ></PlanCardPricing>
          <PlanCardContent>
            <div className="flex gap-2 items-center ">
              <CheckCheck className="w-4 h-4"></CheckCheck>
              <p className="text-sm font-medium">
                تمام امکانات استارتر به همراه:
              </p>
            </div>
            {plan.features.map((feature, index) => (
              <PlanCardFeature key={index}>{feature}</PlanCardFeature>
            ))}
          </PlanCardContent>
          <PlanCardFooter theme={plan.theme}>
            <Button size="lg" className={cn("w-full py-3 h-max")}>
              فعالسازی اشتراک
            </Button>
          </PlanCardFooter>
        </PlanCard>
      ))} */
}
