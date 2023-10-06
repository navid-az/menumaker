import Image from "next/image";

export default function PriceTag({ price, priceUnit, secondaryColor }) {
  return (
    <span
      className={`flex w-max gap-2 ${
        priceUnit == "engLetter" && "flex-row-reverse"
      }`}
    >
      <div className={`text-${secondaryColor}`}>
        {priceUnit == "simple" ? (
          <p
            className={`text-${secondaryColor} text-sm font-semibold sm:text-xl`}
          >
            تومان
          </p>
        ) : priceUnit == "compact" ? (
          <Image
            style={{
              filter:
                " invert(82%) sepia(50%) saturate(267%) hue-rotate(141deg) brightness(93%) contrast(89%)",
            }}
            width={30}
            height={30}
            src={"/images/menu-items/svg/thousand-tomans.svg"}
            alt="fsadfsfa"
          ></Image>
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
      <p className={`text-${secondaryColor} text-sm font-semibold sm:text-xl`}>
        {price}
      </p>
    </span>
  );
}
