'use client'

import React, { ReactNode } from "react";

//functions
import { cn } from "@/lib/utils";
import {
  toPersianDigits,
  addCommas,
} from "@/app/[locale]/(menu)/[business_slug]/utilities/formatCurrency";

//libraries
import { type _Translator, useLocale, useTranslations } from "next-intl";

//SVGs
import { Check, Star } from "lucide-react";

const PlanCard = ({
  className,
  children,
  isCompact = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { isCompact?: boolean }) => {
  return (
    <div
      className={cn(
        "group w-full select-none justify-between overflow-hidden relative flex flex-col gap-5 flex-1 transition-all duration-300 border-2 rounded-lg p-5",
        isCompact ? "min-h-80" : "min-h-[600px] max-w-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const PlanCardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2 z-10", className)} {...props} />
);

const PlanCardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-2xl md:text-3xl font-semibold", className)}
    {...props}
  />
);

const PlanCardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm md:text-base font-light", className)} {...props} />
);

function PlanCardPricing({
  price = 0,
  isFree = false,
  discount = 0,
  className,
}: {
  price?: number;
  isFree?: boolean;
  discount?: number;
  className?: string;
}) {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const formatPrice = (price: string | number) => {
    if (locale === 'fa') {
      return toPersianDigits(price)
    } else {
      return price
    }
  }

  const FRDiscount = formatPrice(discount);
  const discountAmount = (price * discount) / 100;
  const finalPrice = price - discountAmount;
  const formattedOriginalPrice = formatPrice(addCommas(price));
  const formattedDiscountedPrice = formatPrice(addCommas(finalPrice));

  return (
    <div className={cn("flex gap-2 items-center z-10", className)}>
      {isFree ? (
        <p className="text-2xl md:text-4xl font-bold">{t('free')}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {discount > 0 && (
            <div className="flex gap-2 items-center">
              <div className="relative flex gap-2 items-center opacity-50 text-current">
                <p
                  className="relative text-lg md:text-2xl font-medium ltr:font-normal
                before:content-['']
                before:absolute
                before:left-0
                before:top-1/2
                before:w-full
                before:h-[2px]
                before:bg-current
                before:-rotate-12
                before:-translate-y-1/2"
                >
                  {formattedOriginalPrice}
                </p>
                <p className="text-base md:text-lg">{t('unit')}</p>
              </div>
              <p className="bg-royal-green text-xs font-medium rounded-full text-soft-blue px-2.5 py-0.5">
                {FRDiscount}%
              </p>
            </div>
          )}

          <div className="flex gap-2 items-center">
            <p className="text-2xl md:text-4xl font-bold ltr:font-medium">
              {formattedDiscountedPrice}
            </p>
            <p className="text-base md:text-2xl">{t('unit')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const PlanCardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("gap-4 flex flex-col flex-1 w-full z-10", className)}
    {...props}
  />
);

const PlanCardFeatureList = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex gap-1 flex-col",

      className
    )}
    {...props}
  >
    {children}
  </div>
);

const PlanCardFeature = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex gap-2 items-center",

      className
    )}
    {...props}
  >
    <Check className="w-4 h-4" />
    <p className="text-sm font-light">{children}</p>
  </div>
);

// display of feature icons
type PlanCardFeaturesSummeryProps = React.HTMLAttributes<HTMLDivElement> & {
  t: _Translator<Record<string, any>, "pricing">
  children?: ReactNode;
};

const PlanCardFeaturesSummery = ({
  className,
  children,
  t,
  ...props
}: PlanCardFeaturesSummeryProps) => (
  <div
    className={cn("flex flex-col gap-4", className)}
    {...props}
  >
    <div className="flex gap-2 items-center">
      <Star className="w-4 h-4" />
      <p className="text-sm font-medium">
        {t("featuresTitle")}
      </p>
    </div>

    <div className="flex gap-3 items-center">
      {children}
    </div>
  </div>
);

const PlanCardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  //   const colors = PLAN_THEMES[theme];
  return (
    <div
      className={cn(
        "w-full",
        // colors.bg,
        // colors.textPrimary,
        // colors.border,
        className
      )}
      {...props}
    />
  );
};

// circular shadow effect
const PlanCardShadowEffect = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <div
    className={cn(
      "size-64 blur-[90px] group-hover:blur-[110px] group-hover:size-72 group-hover:-bottom-10 group-hover:-inset-e-20 group-hover:top-0 group-hover:right-0 rounded-full absolute -top-20 -right-20 transition-all duration-800",
      className
    )}
    {...props}
  />
);

export {
  PlanCard,
  PlanCardHeader,
  PlanCardTitle,
  PlanCardDescription,
  PlanCardPricing,
  PlanCardContent,
  PlanCardFeatureList,
  PlanCardFeature,
  PlanCardFeaturesSummery,
  PlanCardFooter,
  PlanCardShadowEffect,
};
