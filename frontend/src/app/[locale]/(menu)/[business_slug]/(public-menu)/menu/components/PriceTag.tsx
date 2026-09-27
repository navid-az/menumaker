"use client";

//components
import { Skeleton } from "@/components/ui/skeleton";

//utilities
import {
  toPersianDigits,
  addCommas,
  roundToThousands,
} from "../../../utilities/formatCurrency";

//functions
import { cn } from "@/lib/utils";

//SVGs
import { Toman } from "../../../components";
import { useEffect, useState } from "react";

//libraries
import { useLocale, useTranslations } from "next-intl";

//types
type PriceTagType = {
  price: number;
  unitDisplayType?: "default" | "compact" | "persian_abbr" | "english_abbr";
  size?: "sm" | "default" | "lg" | "xl";
  persianDigits?: boolean;
  removeZeroes?: boolean;
  isLoading?: boolean;
  isFree?: boolean;
  isAvailable?: boolean
  className?: string;
};

export default function PriceTag({
  price,
  unitDisplayType = "default",
  size = "default",
  persianDigits = true,
  removeZeroes = false,
  isLoading,
  isFree = false,
  isAvailable,
  className,
}: PriceTagType) {
  const secondaryColor = "#FFFF";
  const [validatedPrice, setValidatedPrice] = useState<string | number>(price);

  const t = useTranslations('globalComponents.priceTag')
  const locale = useLocale();

  // Format price according to props
  useEffect(() => {
    let formattedPrice: string | number = price;

    // Round if needed → still a number
    if (removeZeroes || unitDisplayType === "compact") {
      formattedPrice = roundToThousands(formattedPrice as number);
    }

    // Add commas → now it's a string
    formattedPrice = addCommas(formattedPrice as number);

    // Convert to Persian digits → still string
    if (persianDigits && locale === 'fa') {
      formattedPrice = toPersianDigits(formattedPrice);
    }

    setValidatedPrice(formattedPrice);
  }, [removeZeroes, price, persianDigits, unitDisplayType, locale]);

  // Item is unavailable
  if (isAvailable === false) {
    return (
      <div className={cn("rounded-full px-2 py-1", className)}>
        <p>{t('placeholder')}</p>
      </div>
    );
  }

  return (
    <span
      className={cn(
        "flex w-max items-center justify-between gap-1",
        className
      )}
    >
      {!isLoading ? (
        <div
          className={cn(
            "flex items-end gap-1",
            locale === "en" &&
            unitDisplayType === "compact" &&
            "flex-row-reverse"
          )}
        >
          <p
            className={cn(
              `text-${secondaryColor}`,
              size === "sm"
                ? "text-sm font-normal"
                : size === "default"
                  ? "text-lg font-normal -mb-0.5"
                  : size === "lg"
                    ? "text-2xl font-medium -mb-1"
                    : size === "xl"
                      ? "text-3xl font-semibold -mb-1"
                      : ""
            )}
          >
            {validatedPrice}
          </p>

          {unitDisplayType === "persian_abbr" ? (
            <p
              className={cn(
                `text-${secondaryColor}`,
                size === "sm"
                  ? "text-sm font-normal"
                  : size === "default"
                    ? "text-base font-normal"
                    : size === "lg"
                      ? "text-2xl font-medium -mb-1"
                      : size === "xl"
                        ? "text-3xl font-semibold -mb-1"
                        : ""
              )}
            >
              {locale === "fa" ? "ت" : "T"}
            </p>
          ) : unitDisplayType === "compact" ? (
            <span
              className={cn(
                "relative flex",
                size === "sm"
                  ? "size-6"
                  : size === "default"
                    ? "size-6 -mb-1 ltr:-me-1 rtl:-ms-1"
                    : size === "lg"
                      ? "size-7 -mb-1.5"
                      : size === "xl"
                        ? "size-8 -mb-2.5 ltr:-me-2 rtl:-ms-2"
                        : ""
              )}
            >
              <Toman className={`h-full w-full text-${secondaryColor}`} />
            </span>
          ) : unitDisplayType === "english_abbr" ? (
            <p
              className={cn(
                `text-${secondaryColor}`,
                size === "sm"
                  ? "text-sm font-normal"
                  : size === "default"
                    ? "text-base font-normal"
                    : size === "lg"
                      ? "text-2xl font-medium -mb-1"
                      : size === "xl"
                        ? "text-3xl font-semibold -mb-1"
                        : ""
              )}
            >
              T
            </p>
          ) : unitDisplayType === "default" ? (
            <p
              className={cn(
                `text-${secondaryColor}`,
                size === "sm"
                  ? "text-xs font-normal"
                  : size === "default"
                    ? "text-sm font-normal"
                    : size === "lg"
                      ? "text-sm font-semibold"
                      : size === "xl"
                        ? "text-base font-semibold"
                        : ""
              )}
            >
              {locale === "fa" ? "تومان" : "Toman"}
            </p>
          ) : null}
        </div>
      ) : (
        <div className={`text-${secondaryColor}`}>
          <div className="flex h-6 w-20 gap-1">
            <Skeleton className="h-full w-8/12" />
            <Skeleton className="h-full w-4/12" />
          </div>
        </div>
      )}
    </span>
  );
}