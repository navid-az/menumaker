import Image from "next/image";
import AddItemBtn from "./AddItemBtn";
import PriceTag from "./PriceTag";
import Tag from "./Tag";

export default function MenuItem({
  title = "نام آیتم",
  body = "توضیچ آیتم",
  type = "vertical", //horizontal - vertical
  price = "قیمت",
  priceUnit = "simple", //simple - compact - engLetter
  primaryColor = "royale-green",
  secondaryColor = "sky-blue",
  available = true,
  hot = false,
  vegan = false,
  specialItem = false,
}) {
  return (
    <>
      <div
        className={`flex justify-between gap-2 rounded-lg bg-${primaryColor} relative select-none p-2 sm:gap-3 sm:p-3 ${
          type == "vertical"
            ? "h-auto flex-1 flex-col-reverse flex-wrap sm:h-auto"
            : "h-28 w-full sm:h-48"
        }`}
      >
        <section
          className={`relative flex flex-1 flex-col justify-between  ${
            type == "vertical" ? "gap-16" : "gap-2 sm:gap-3"
          }`}
        >
          <section className="absolute flex h-5 gap-1">
            <Tag name="hot" justIcon={true}></Tag>
            <Tag name="hot" justIcon={false}></Tag>
            <Tag name="دیی"></Tag>
          </section>
          <header className="flex flex-col gap-1 text-end">
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
        <section
          className={`relative w-5/12 rounded-lg  ${
            type == "vertical" ? "h-40 w-full" : "w-5/12"
          }`}
        >
          <Image
            src={"/images/menu-items/pizza.jpeg"}
            fill={true}
            alt={title}
            style={{ objectFit: "cover", borderRadius: "8px" }}
            quality={100}
          ></Image>
        </section>
      </div>
    </>
  );
}
