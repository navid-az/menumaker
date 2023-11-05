// react query
import { useEffect, useRef } from "react";
import Image from "next/image";

import AddItemBtn from "./AddItemBtn";
import PriceTag from "./PriceTag";

import gsap from "gsap";

export default function ItemsDescriptionTab({
  isActive,
  activeItemData,
  action,
}) {
  const darkGg = useRef(null);
  const itemDescriptionTab = useRef(null);
  let tl = gsap.timeline({ defaults: { duration: 0.15 } });

  useEffect(() => {
    if (isActive) {
      tl.to(darkGg.current, { display: "flex" })
        .to(darkGg.current, { opacity: 1 })
        .to(
          itemDescriptionTab.current,
          {
            y: 20,
            ease: "elastic.out(0.8,0.9)",
            duration: 0.7,
          },
          ">"
        );
    }
  }, [isActive]);

  const closeTab = () => {
    tl.reverse();
    action();
  };

  return (
    <div
      ref={darkGg}
      className="fixed z-50 hidden h-screen w-screen bg-black/60 opacity-0"
      onClick={closeTab}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        ref={itemDescriptionTab}
        className="absolute bottom-0 grid h-auto w-full translate-y-full flex-col gap-2 rounded-t-2xl bg-royale-green p-2 pb-7 text-sky-blue"
      >
        <div className="absolute -top-3 h-1 w-2/12 justify-self-center rounded-full bg-sky-blue"></div>
        <section
          className={`relative h-56 w-full rounded-lg sm:h-72
          `}
        >
          <Image
            src={"/images/menu-items/pizza.jpeg"}
            fill={true}
            alt="food item's image"
            style={{ objectFit: "cover", borderRadius: "12px" }}
            quality={100}
          ></Image>
        </section>
        <header className="flex flex-col gap-2 text-end">
          <h3 className={`text-lg font-semibold text-sky-blue sm:text-2xl`}>
            {activeItemData["title"]}
          </h3>
          <p className={`text-sm font-light text-sky-blue sm:text-base`}>
            {activeItemData["body"]}
          </p>
        </header>
        <footer className="flex h-7 w-full items-center justify-between sm:h-10">
          <PriceTag
            price={activeItemData["price"]}
            priceUnit={"simple"}
            isLoading={false}
          />
          <AddItemBtn />
        </footer>
      </section>
    </div>
  );
}
