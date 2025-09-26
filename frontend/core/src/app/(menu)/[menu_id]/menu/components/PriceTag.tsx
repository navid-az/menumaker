//components
import { Skeleton } from "@/components/ui/skeleton";

//utilities
import {
  toPersianDigits,
  addCommas,
  roundToThousands,
} from "../../utilities/formatCurrency";

//libraries
import { cva } from "class-variance-authority";

//SVGs
import { Toman } from "../../components";
import { useEffect, useState } from "react";

//types
type PriceTagType = {
  price: number;
  unitDisplayType?: "default" | "minimal" | "compact" | "engMinimal";
  size?: "default" | "sm" | "lg";
  persianDigits?: boolean;
  removeZeroes?: boolean;
  isLoading?: boolean;
  isFree?: boolean;
};

export default function PriceTag({
  price,
  unitDisplayType = "default",
  size,
  persianDigits = true,
  removeZeroes = false,
  isLoading,
  isFree = false,
}: PriceTagType) {
  const secondaryColor = "#FFFF";
  const [validatedPrice, setValidatedPrice] = useState<string | number>(price);

  // Format price according to props
  useEffect(() => {
    let formattedPrice: string | number = price; // start with number

    // Round if needed → still a number
    if (removeZeroes || unitDisplayType === "compact") {
      formattedPrice = roundToThousands(formattedPrice as number);
    }

    // Add commas → now it's a string
    formattedPrice = addCommas(formattedPrice as number);

    // Convert to Persian digits → still string
    if (persianDigits) {
      formattedPrice = toPersianDigits(formattedPrice);
    }

    setValidatedPrice(formattedPrice as string);
  }, [removeZeroes, price, persianDigits, unitDisplayType]);

  return (
    <span className={`flex w-max items-center justify-between gap-1`}>
      {!isLoading ? (
        <div className="flex items-center gap-1">
          <p
            className={`text-${secondaryColor} mt-1 ${
              size === "sm"
                ? "text-md font-medium"
                : size === "lg"
                ? "text-3xl"
                : "text-2xl"
            } sm:text-2xl`}
          >
            {validatedPrice}
          </p>
          {unitDisplayType == "minimal" ? (
            <p
              className={`text-${secondaryColor} text-sm font-semibold sm:text-xl`}
            >
              ت
            </p>
          ) : unitDisplayType == "compact" ? (
            <span
              className={`relative flex sm:h-8 sm:w-8 ${
                size === "sm"
                  ? "h-6 w-6"
                  : size === "lg"
                  ? "h-8 w-8"
                  : "h-8 w-8"
              }`}
            >
              <Toman className={`h-full w-full text-${secondaryColor}`}></Toman>
            </span>
          ) : unitDisplayType == "engMinimal" ? (
            <p
              className={`text-${secondaryColor} text-sm font-semibold sm:text-xl`}
            >
              T
            </p>
          ) : unitDisplayType == "default" ? (
            <p
              className={`text-${secondaryColor} text-sm font-semibold sm:text-xl`}
            >
              تومان
            </p>
          ) : (
            ""
          )}
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
