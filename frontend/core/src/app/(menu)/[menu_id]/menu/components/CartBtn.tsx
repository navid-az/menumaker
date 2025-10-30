"use client";

import React, { useEffect, useRef, useState } from "react";

//libraries
import gsap from "gsap";
import { cn } from "@/lib/utils";

//components
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

//hooks
import { useItemCart } from "@/lib/stores";
import { useMenuItemDrawer } from "@/lib/stores";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//SVGs
import { ShoppingBag } from "lucide-react";

//types
import { type MenuCategory } from "@/app/types/api/menu";
import { type MenuItem } from "@/app/types/api/menu";
import { type MenuGlobalStylingUI } from "@/app/types/ui/menu";

type CartBtnType = {
  type?: "default" | "compact";
  businessSlug?: string;
  categories: MenuCategory[];
  globalStyling: MenuGlobalStylingUI;
};

export default function CartBtn({
  type = "default",
  businessSlug,
  categories,
  globalStyling,
}: CartBtnType) {
  const cartBtnRef = useRef<HTMLButtonElement>(null);

  const DrawerIsOpen = useMenuItemDrawer((state) => state.isOpen);
  const cartItems = useItemCart((state) => state.items);

  //store categories of items inside cartItems
  const [matchingItems, setMatchingItems] = useState<
    { item: MenuItem; count: number }[]
  >([]);

  useEffect(() => {
    const items = cartItems
      .map((cartItem) => cartItem.id)
      .flatMap((cartItemId) => {
        if (categories) {
          return categories.flatMap((category) =>
            category.items
              .filter((item) => item.id === cartItemId)
              .map((matchingItem) => ({
                item: matchingItem,
                count:
                  cartItems.find((cartItem) => cartItem.id === matchingItem.id)
                    ?.count || 0,
              }))
          );
        } else {
          return [];
        }
      });
    setMatchingItems(items);
  }, [cartItems]);

  //show/hide cart button according to MenuItem Drawer & items count
  useEffect(() => {
    if (DrawerIsOpen) {
      gsap.to(cartBtnRef.current, {
        duration: 0.3,
        y: 0,
      });
    } else {
      if (cartItems.length > 0) {
        gsap.to(cartBtnRef.current, {
          delay: 0.5,
          duration: 0.3,
          y: -80,
        });
      } else if (cartItems.length === 0) {
        gsap.to(cartBtnRef.current, {
          duration: 0.3,
          y: 0,
        });
      }
    }

    //automatically animate compact cart button
    if (type === "compact") {
      autoTactile();
    }
  }, [cartItems, DrawerIsOpen]);

  //total number of selected items
  const totalItemCount = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    0
  );

  //add animations *needs to be checked using props value*
  // useConditionalAnimation(cartBtnRef, ["tactile"]);
  //automatically add tactile animation (only for compact button)
  const autoTactile = useTactileAnimation(cartBtnRef, {});

  if (type === "default") {
    return (
      <Button
        ref={cartBtnRef}
        asChild
        className={cn(
          "fixed bottom-[-80px] mx-4 mb-4 border-2 border-(--secondary) left-0 right-0 z-50 flex h-max items-center justify-between rounded-(--radius-base) p-2 bg-[var(--footer-cart-bg)] text-[var(--footer-cart-text)] shadow-2xl xs:p-2.5 transition-[box-shadow,border-radius,color,background-color] duration-300",
          globalStyling.style === "retro" &&
            "border-3 shadow-[4px_4px_0px_0px_var(--secondary)]"
        )}
      >
        <Link href={`/${businessSlug}/orders`}>
          <div className=" flex items-center pr-2">
            <p
              className={cn(
                "text-lg font-medium text-(--secondary) xs:text-xl xs:font-semibold",
                globalStyling.style === "retro" && "font-black"
              )}
            >
              ثبت سفارش
            </p>
          </div>
          <section className="flex shrink flex-row-reverse justify-start ltr:space-x-reverse gap-1">
            {matchingItems.slice(0, 3).map((item) => (
              <div
                key={item.item.id}
                className={cn(
                  "relative h-11 w-11 bg-(--bg) -ml-4 first:ml-0 rounded-(--radius-base) border-2 border-(--secondary) shadow-sm transition-all duration-300 xs:h-12 xs:w-12",
                  globalStyling.style === "retro" &&
                    "border-3 shadow-[2px_2px_0px_0px_var(--secondary)]"
                )}
              >
                <Image
                  fill
                  src={"http://127.0.0.1:8000" + item.item.image}
                  alt={item.item.name}
                  className="rounded-(--radius-base) object-cover transition-all duration-300"
                ></Image>
                <div
                  className={cn(
                    "absolute z-10 h-4.5 w-4.5 flex justify-center items-center rounded-(--radius-inner-alt) border-2 border-(--secondary) text-center text-xs pt-0.5 font-normal bg-[var(--footer-cart-counter-bg)] text-[var(--footer-cart-counter-text)] transition-all duration-300",
                    globalStyling.border_radius === "full"
                      ? "-left-0.5 -top-0.5"
                      : "-left-1.5 -top-1.5",
                    globalStyling.style === "retro" && "font-medium"
                  )}
                >
                  {item.count}
                </div>
              </div>
            ))}
            {matchingItems.length > 3 && (
              <div className="h-11 w-11 rounded-(--radius-base) z-10 -ml-4 border-2 border-(--primary) bg-(--secondary) pt-3 text-center text-(--primary) shadow-sm transition-all duration-300 xs:h-12 xs:w-12">
                <p>{matchingItems.length - 3}+</p>
              </div>
            )}
          </section>
        </Link>
      </Button>
    );
  } else if (type === "compact") {
    return (
      <div className="fixed w-full bottom-[-80px] z-50 mb-4 flex justify-center">
        <Button
          ref={cartBtnRef}
          asChild
          className={cn(
            "relative h-14 w-14 rounded-(--radius-base) bg-[var(--footer-cart-bg)] text-[var(--footer-cart-text)] transition-[box-shadow] duration-300",
            globalStyling.style === "retro" &&
              "border-3 border-(--secondary) shadow-[4px_4px_0px_0px_var(--secondary)]"
          )}
          size="icon"
        >
          <Link href={`/${businessSlug}/orders`}>
            <ShoppingBag className="h-6 w-6 text-(--secondary)"></ShoppingBag>
            {totalItemCount >= 1 && (
              <div
                className={cn(
                  "absolute z-10 h-5.5 w-5.5 flex justify-center items-center rounded-(--radius-inner-alt) border-(--secondary) bg-[var(--footer-cart-counter-bg)] text-[var(--footer-cart-counter-text)] text-center text-xs pt-0.5 font-normal transition-all duration-300",
                  globalStyling.border_radius === "full"
                    ? "-left-0.5 -top-0.5"
                    : "-left-1.5 -top-1.5",
                  globalStyling.style === "retro" && "font-black"
                )}
              >
                {totalItemCount}
              </div>
            )}
          </Link>
        </Button>
      </div>
    );
  }
}
