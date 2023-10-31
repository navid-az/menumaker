import Image from "next/image";
import AddItemBtn from "./AddItemBtn";
import PriceTag from "./PriceTag";
import Tag from "./Tag";
import { createContext, useContext } from "react";

// react query
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import ItemsCategoryTitle from "./ItemsCategoryTitle";

export const dataIsLoadingContext = createContext(null);

export default function MenuItemsWrapper({ params }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/single/${params.orgName}`
      );
      return data;
    },
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <dataIsLoadingContext.Provider value={isLoading}>
      {!isLoading ? (
        data["categories"].map(
          (category) =>
            category["items"].length > 0 && (
              <section className="relative">
                {category["items"].length > 0 && (
                  <ItemsCategoryTitle categoryName={category.name} />
                )}
                <div className="flex flex-col gap-2">
                  {category["items"].map((item) => (
                    <MenuItem
                      isLoading={isLoading}
                      key={item.id}
                      price={item.price}
                      body={item.description}
                      title={item.name}
                      // type={type}
                    ></MenuItem>
                  ))}
                </div>
              </section>
            )
        )
      ) : (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }, () => (
            <MenuItem isLoading={isLoading} />
          ))}
        </div>
      )}
    </dataIsLoadingContext.Provider>
  );
}

function MenuItem({
  title,
  body,
  type = "horizontal", //horizontal - vertical
  price,
  priceUnit = "simple", //simple - compact - engLetter
  primaryColor = "royale-green",
  secondaryColor = "sky-blue",
  available = true,
  hot = false,
  vegan = false,
  specialItem = false,
  isLoading,
}) {
  return (
    <div
      className={`flex min-h-[8rem] justify-between gap-2 rounded-lg bg-${primaryColor} relative select-none p-2 sm:gap-3 sm:p-3 ${
        type == "vertical"
          ? "h-auto flex-1 flex-col-reverse flex-wrap sm:h-auto"
          : "h-auto w-full sm:h-48"
      }`}
    >
      <section
        className={`relative flex flex-1 flex-col justify-between  ${
          type == "vertical" ? "gap-16" : "gap-2 sm:gap-3"
        }`}
      >
        <section className="absolute flex h-5 gap-1">
          <Tag name="hot" justIcon={true} isLoading={isLoading}></Tag>
        </section>
        <header className="flex flex-col gap-1 text-end">
          <h3
            className={`text-base text-${secondaryColor} font-semibold sm:text-xl`}
          >
            {title || <Skeleton width="40%" />}
          </h3>
          <p
            className={` text-${secondaryColor} text-[10px] font-light sm:text-base`}
          >
            {isLoading ? (
              <Skeleton className=" last-of-type:w-8/12" count={3} />
            ) : (
              body || undefined
            )}
          </p>
        </header>
        <footer className="flex h-7 w-full items-center justify-between sm:h-10">
          <PriceTag
            price={price}
            priceUnit={priceUnit}
            secondaryColor={secondaryColor}
            isLoading={isLoading}
          ></PriceTag>
          {isLoading ? (
            <div className="h-full w-4/12">
              <Skeleton containerClassName="flex h-full" />
            </div>
          ) : (
            <AddItemBtn
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            ></AddItemBtn>
          )}
        </footer>
      </section>
      <section
        className={`relative w-5/12 rounded-lg  ${
          type == "vertical" ? "h-40 w-full" : "w-5/12"
        }`}
      >
        {(
          <Image
            src={"/images/menu-items/pizza.jpeg"}
            fill={true}
            alt="food item's image"
            style={{ objectFit: "cover", borderRadius: "8px" }}
            quality={100}
          ></Image>
        ) || <Skeleton />}
      </section>
    </div>
  );
}
