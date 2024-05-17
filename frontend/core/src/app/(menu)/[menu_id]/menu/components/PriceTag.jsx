import Image from "next/image";

//components
import Skeleton from "react-loading-skeleton";

//utilities
import { formatCurrency } from "../../utilities/formatCurrency";

export default function PriceTag({
  price,
  priceUnit,
  secondaryColor = "#FFFF",
  isLoading,
}) {
  return (
    <span
      className={`flex w-max items-center gap-1 ${
        priceUnit == "engLetter" && "flex-row-reverse"
      }`}
    >
      <div className={`text-${secondaryColor}`}>
        {isLoading ? (
          <Skeleton width={60} height="100%" />
        ) : priceUnit == "simple" ? (
          <p
            className={`text-${secondaryColor} text-sm font-semibold sm:text-xl`}
          >
            تومان
          </p>
        ) : priceUnit == "compact" ? (
          <span className="relative flex h-6 w-6 sm:h-8 sm:w-8">
            <Image
              style={{
                filter:
                  " invert(82%) sepia(50%) saturate(267%) hue-rotate(141deg) brightness(93%) contrast(89%)",
              }}
              fill={true}
              src={"/images/menu-items/svg/thousand-tomans.svg"}
              alt="thousand-tomans"
            ></Image>
          </span>
        ) : priceUnit == "engLetter" ? (
          <p
            className={`text-${secondaryColor} text-sm font-semibold sm:text-xl`}
          >
            T
          </p>
        ) : (
          ""
        )}
      </div>
      <p
        className={`text-${secondaryColor} text-base font-semibold sm:text-xl`}
      >
        {formatCurrency(price)}
      </p>
    </span>
  );
}
