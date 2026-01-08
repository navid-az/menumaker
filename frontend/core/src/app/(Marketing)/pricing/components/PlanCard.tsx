import React from "react";

//functions
import { cn } from "@/lib/utils";
import {
  toPersianDigits,
  addCommas,
} from "@/app/(menu)/[business_slug]/utilities/formatCurrency";

//SVGs
import { Check, Star } from "lucide-react";

//types
// type PlanCardProps = {
//   title: string;
//   description: string;
//   price: number;
//   isFree?: boolean;
//   primaryColor?: string;
//   secondaryColor?: string;
// };

// export default function PlanCard({
//   title,
//   description,
//   price,
//   isFree = false,
//   primaryColor,
//   secondaryColor,
// }: PlanCardProps) {
//   return (
//     <div className="w-full flex flex-col gap-5 flex-1 hover:border-primary/40 transition-all duration-300 bg-soft-blue border-2 border-primary/10 rounded-lg p-5">
//       <div className="flex flex-col gap-2">
//         <h2 className="text-2xl md:text-3xl font-medium">{title}</h2>
//         <p className="text-sm md:text-base font-light">{description}</p>
//       </div>
//       <PlanCardPricing price={price}></PlanCardPricing>
//       <div className="flex gap-2 items-center">
//         <CheckCheck className="w-4 h-4"></CheckCheck>
//         <p className="text-sm font-medium">تمام امکانات استارتر به همراه:</p>
//       </div>
//       <section className="flex flex-col gap-2">
//         <div className="flex gap-2">
//           <Check className="w-4 h-4"></Check>
//           <p className="text-sm font-light">تمام امکانات استارتر به همراه:</p>
//         </div>
//         <div className="flex gap-2">
//           <Check className="w-4 h-4"></Check>
//           <p className="text-sm font-light">تمام امکانات استارتر به همراه:</p>
//         </div>
//         <div className="flex gap-2">
//           <Check className="w-4 h-4"></Check>
//           <p className="text-sm font-light">تمام امکانات استارتر به همراه:</p>
//         </div>
//       </section>
//       <Button
//         size="lg"
//         className="bg-royal-green mt-20 py-3 h-max text-soft-blue"
//       >
//         فعالسازی اشتراک
//       </Button>
//     </div>
//   );
// }

// function PlanCardHeader({ children }: { children: React.ReactNode }) {
//   return <div className="flex flex-col gap-2">{children}</div>;
// }

// function PlanFeaturesList() {
//   return <div></div>;
// }

// function PlanFeatureItem() {
//   return <div></div>;
// }

// export type PlanTheme = "blue" | "purple" | "gold";

// export const PLAN_THEMES: Record<
//   PlanTheme,
//   {
//     bg: string;
//     textPrimary: string;
//     border: string;
//     accent: string;
//   }
// > = {
//   blue: {
//     bg: "bg-soft-blue",
//     textPrimary: "text-royal-green",
//     border: "border-royal-green/10",
//     accent: "border-green-500",
//   },
//   purple: {
//     bg: "bg-purple-100",
//     textPrimary: "text-purple-950",
//     border: "border-purple-950/10",
//     accent: "border-purple-500",
//   },
//   gold: {
//     bg: "bg-yellow-50",
//     textPrimary: "text-yellow-950",
//     border: "border-yellow-950/10",
//     accent: "border-purple-500",
//   },
// };

// PlanCard base component
const PlanCard = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  //   const colors = PLAN_THEMES[theme];

  return (
    <div
      className={cn(
        "group w-full min-h-[600px] select-none max-w-sm overflow-hidden relative flex flex-col gap-5 flex-1 hover:border-primary/40 transition-all duration-300 border-2 rounded-lg p-5",
        // colors.bg,
        // colors.textPrimary,
        // colors.border,
        className
      )}
      {...props}
    />
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
  price,
  isFree = false,
  discount = 0,
  className,
}: {
  price: number;
  isFree?: boolean;
  discount?: number;
  className?: string;
}) {
  const FRDiscount = toPersianDigits(discount);
  const discountAmount = (price * discount) / 100;
  const finalPrice = price - discountAmount;
  const formattedOriginalPrice = toPersianDigits(addCommas(price));
  const formattedDiscountedPrice = toPersianDigits(addCommas(finalPrice));

  return (
    <div className={cn("flex gap-2 items-center z-10", className)}>
      {isFree ? (
        <p className="text-2xl md:text-4xl font-bold">رایگان!</p>
      ) : (
        <div className="flex flex-col gap-2">
          {discount > 0 && (
            <div className="flex gap-2 items-center">
              <div className="relative flex gap-2 items-center opacity-50 text-current">
                <p
                  className="relative text-lg md:text-2xl font-medium
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
                <p className="text-base md:text-lg">تومان</p>
              </div>
              <span className="bg-royal-green text-sm font-semibold rounded-full text-soft-blue px-2.5 py-1">
                {FRDiscount}٪
              </span>
            </div>
          )}

          <div className="flex gap-2 items-center">
            <p className="text-2xl md:text-4xl font-bold">
              {formattedDiscountedPrice}
            </p>
            <p className="text-base md:text-2xl">تومان</p>
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
const PlanCardFeaturesSummery = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col gap-4",

      className
    )}
    {...props}
  >
    <div className="flex gap-2 items-center">
      <Star className="w-4 h-4"></Star>
      <p className="text-sm font-medium">ویژگی‌ های این اشتراک:</p>
    </div>
    <div className="flex gap-3 items-center">{children}</div>
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
      "size-64 blur-[90px] group-hover:blur-[110px] group-hover:size-72 group-hover:-bottom-10 group-hover:-left-20 group-hover:top-0 group-hover:right-0 rounded-full absolute -top-20 -right-20 transition-all duration-800",
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
