import Image from "next/image";
import AddItemBtn from "./AddItemBtn";
import PriceTag from "./PriceTag";

export default function MenuItem({
  title = "نام آیتم",
  body = "توضیچ آیتم",
  price = "قیمت",
  priceUnit = "compact",
  primaryColor = "royale-green",
  secondaryColor = "sky-blue",
  available = true,
  hot = false,
  vegan = false,
  specialItem = false,
}) {
  return (
    <div
      className={`flex h-28 w-full justify-between gap-2 rounded-lg bg-${primaryColor} select-none p-2 sm:h-48 sm:gap-3 sm:p-3`}
    >
      <section className="flex flex-1 flex-col justify-between">
        <header className="flex flex-col gap-1 text-right">
          <h3
            className={`text-base text-${secondaryColor} font-semibold sm:text-xl`}
          >
            {title}
          </h3>
          <p
            className={` text-${secondaryColor} text-[10px] font-light sm:text-base`}
          >
            {body}
          </p>
        </header>
        <footer className="flex h-7 w-full items-center justify-between sm:h-10">
          <PriceTag
            price={price}
            priceUnit={priceUnit}
            secondaryColor={secondaryColor}
          ></PriceTag>
          <AddItemBtn
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          ></AddItemBtn>
        </footer>
      </section>
      <section className="relative w-5/12 rounded-lg">
        <Image
          src={"/images/menu-items/pizza.jpeg"}
          fill={true}
          alt={title}
          style={{ objectFit: "cover", borderRadius: "8px" }}
          quality={100}
        ></Image>
      </section>
    </div>
  );
}
