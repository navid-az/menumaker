//components
import { Skeleton } from "@/components/ui/skeleton";

//utilities
import { formatCurrency } from "../../utilities/formatCurrency";

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
  removeZeroes?: boolean;
  isLoading?: boolean;
  isFree?: boolean;
};

export default function PriceTag({
  price,
  unitDisplayType = "default",
  size,
  removeZeroes = false,
  isLoading,
  isFree = false,
}: PriceTagType) {
  const secondaryColor = "#FFFF";
  const [validatedPrice, setValidatedPrice] = useState<string | number>(price);

  useEffect(() => {
    if (removeZeroes || unitDisplayType === "compact") {
      setValidatedPrice(removeTrailingZeros(price));
    } else {
      setValidatedPrice(formatCurrency(price));
    }
  }, [removeZeroes, price]);

  function removeTrailingZeros(number: number) {
    // Convert the number to a string
    const numberString = number.toString();

    // Find the index of the first non-zero digit from the right
    let nonZeroIndex = numberString.length - 1;
    while (nonZeroIndex >= 0 && numberString[nonZeroIndex] === "0") {
      nonZeroIndex--;
    }

    // Extract the non-zero portion of the string
    const trimmedNumberString = numberString.slice(0, nonZeroIndex + 1);

    // Convert the trimmed string back to a number
    const trimmedNumber = parseInt(trimmedNumberString, 10);

    return trimmedNumber;
  }

  return (
    <span className={`flex w-max items-center justify-between gap-1`}>
      {!isLoading ? (
        <div className="flex items-center gap-1">
          <p
            className={`text-${secondaryColor} mt-1 font-semibold ${
              size === "sm"
                ? "text-xl"
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
