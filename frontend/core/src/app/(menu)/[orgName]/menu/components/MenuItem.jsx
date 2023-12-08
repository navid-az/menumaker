import { createContext, useRef, useState } from "react";
import Image from "next/image";

//components
import AddItemBtn from "./AddItemBtn";
import PriceTag from "./PriceTag";
import Tag from "./Tag";
import ItemsCategoryTitle from "./ItemsCategoryTitle";
import ItemsDescriptionTab from "./ItemsDescriptionTab";

import { useRippleAnimation } from "../../hooks/useRippleAnimation";

// react query
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

export const dataIsLoadingContext = createContext(null);

export default function MenuItemsWrapper({ params, type, searchedValue }) {
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

  const [activeItemData, setActiveItemData] = useState({
    id: null,
    title: null,
    body: null,
    count: 0,
  });

  const [isActive, setIsActive] = useState(false);

  const activeItem = (id, title, body, price, priceUnit) => {
    setIsActive((prev) => !prev);
    setActiveItemData({
      id: id,
      title: title,
      body: body,
      price: price,
      priceUnit: priceUnit,
    });
  };

  return (
    <dataIsLoadingContext.Provider value={isLoading}>
      <div
        className={`relative p-2 sm:container sm:gap-4 ${
          type == "vertical" ? "" : "flex flex-col"
        }`}
      >
        {!isLoading ? (
          data["categories"].map(
            (category) =>
              category["items"].length > 0 && (
                <div key={category.id} className="relative">
                  <ItemsCategoryTitle
                    id={category.id}
                    categoryName={category.name}
                    parentType={type}
                  />
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {searchedValue === ""
                      ? category["items"].map((item) => (
                          <MenuItem
                            isLoading={isLoading}
                            key={item.id}
                            id={item.id}
                            title={item.name}
                            body={item.description}
                            price={item.price}
                            onClick={activeItem}
                          ></MenuItem>
                        ))
                      : category["items"]
                          .filter((item) => item.name.includes(searchedValue))
                          .map((item) => (
                            <MenuItem
                              isLoading={isLoading}
                              key={item.id}
                              id={item.id}
                              title={item.name}
                              body={item.description}
                              price={item.price}
                              onClick={activeItem}
                            ></MenuItem>
                          ))}
                  </div>
                </div>
              )
          )
        ) : (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 10 }, () => (
              <MenuItem isLoading={isLoading} />
            ))}
          </div>
        )}
      </div>
      <ItemsDescriptionTab
        activeItemData={activeItemData}
        isActive={isActive}
        action={() => setIsActive((prev) => !prev)}
      />
    </dataIsLoadingContext.Provider>
  );
}

function MenuItem({
  id,
  title,
  body,
  type = "vertical", //horizontal - vertical
  price,
  priceUnit = "simple", //simple - compact - engLetter
  primaryColor = "royal-green",
  secondaryColor = "sky-blue",
  available = true,
  hot = false,
  vegan = false,
  specialItem = false,
  isLoading,
  onClick = null,
}) {
  const openDescriptionTab = (e) => {
    e.stopPropagation();
    onClick(id, title, body, price, priceUnit);
  };
  const buttonRef = useRef();
  useRippleAnimation(buttonRef, { size: 800, duration: 1500 });
  return (
    <div
      onClick={openDescriptionTab}
      className={`relative flex min-h-[8rem] justify-between gap-2 rounded-lg bg-${primaryColor} relative select-none p-2 sm:gap-3 sm:p-3 ${
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
        <footer className="relative flex h-max w-full items-center justify-between">
          <PriceTag
            price={price}
            priceUnit={priceUnit}
            secondaryColor={secondaryColor}
            isLoading={isLoading}
          ></PriceTag>
          {isLoading ? (
            <div className="h-full w-4/12 sm:w-2/12">
              <Skeleton containerClassName="flex h-full" />
            </div>
          ) : (
            <AddItemBtn
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              itemId={id}
            ></AddItemBtn>
          )}
        </footer>
      </section>
      <section
        className={`relative w-5/12 rounded-lg transition-all xss:h-48 xs:h-56  ${
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

      {/* for test (only for ripple click animation) */}
      <div
        ref={buttonRef}
        className=" absolute bottom-0 right-0 h-full w-full bg-none"
      ></div>
    </div>
  );
}
