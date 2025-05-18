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
import { type MenuItemType } from "./Items/MenuItem";
import { type MenuGlobalStyling } from "../page";
import { type CategoryType } from "./ItemsCategory";

type CartBtnType = {
  type?: "default" | "compact";
  categories: CategoryType[];
  globalStyling: MenuGlobalStyling;
};

export default function CartBtn({
  type = "default",
  categories,
  globalStyling,
}: CartBtnType) {
  const cartBtnRef = useRef<HTMLButtonElement>(null);

  const DrawerIsOpen = useMenuItemDrawer((state) => state.isOpen);
  const cartItems = useItemCart((state) => state.items);

  //store categories of items inside cartItems
  const [matchingItems, setMatchingItems] = useState<
    { item: MenuItemType; count: number }[]
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
        className="!fixed bottom-[-80px] left-0 right-0 z-50 m-4 flex h-max items-center justify-between rounded-[var(--radius-base)] bg-[color:var(--secondary)] p-2 text-[color:var(--primary)] shadow-2xl xs:p-2.5"
      >
        <Link href={`/venhan/orders`}>
          <div className=" flex items-center pr-2">
            <p className="text-lg font-medium text-[color:var(--primary)] xs:text-xl xs:font-semibold">
              ثبت سفارش
            </p>
          </div>
          <section className="flex flex-shrink flex-row-reverse justify-start -space-x-4 ltr:space-x-reverse">
            {matchingItems.slice(0, 3).map((item) => (
              <div
                key={item.item.id}
                className="relative h-11 w-11 rounded-[var(--radius-base)] border-2 border-[color:var(--primary)] shadow-sm transition-all duration-300 xs:h-12 xs:w-12"
              >
                <Image
                  fill
                  src={"http://127.0.0.1:8000/" + item.item.image}
                  alt={item.item.name}
                  className="rounded-[var(--radius-base)] object-cover"
                ></Image>
                <div
                  className={cn(
                    "absolute z-10 h-[18px] w-[18px] rounded-[var(--radius-base)] border border-[color:var(--secondary)] bg-[color:var(--primary)] pt-0.5 text-center text-xs font-light text-[color:var(--secondary)] transition-all duration-300 xs:h-5 xs:w-5 xs:font-normal",
                    globalStyling.border_radius === "full"
                      ? "-left-0.5 -top-0.5"
                      : "-left-1.5 -top-1.5"
                  )}
                >
                  {item.count}
                </div>
              </div>
            ))}
            {matchingItems.length > 3 && (
              <div className="h-11 w-11 rounded-[var(--radius-base)] border-2 border-[color:var(--secondary)] bg-[color:var(--primary)] pt-3 text-center text-[color:var(--secondary)] shadow-sm transition-all duration-300 xs:h-12 xs:w-12">
                <p>{matchingItems.length - 3}+</p>
              </div>
            )}
          </section>
        </Link>
      </Button>
    );
  } else if (type === "compact") {
    return (
      <div className="fixed bottom-[-80px] z-50 mb-2 flex w-screen justify-center">
        <Button
          ref={cartBtnRef}
          asChild
          className="relative h-14 w-14 rounded-[var(--radius-base)] bg-[color:var(--secondary)] shadow-inner"
          size="icon"
        >
          <Link href={`/venhan/orders`}>
            <ShoppingBag className="h-6 w-6 text-[color:var(--primary)]"></ShoppingBag>
            {totalItemCount >= 1 && (
              <div
                className={cn(
                  "absolute z-10 h-6 w-6 rounded-[var(--radius-base)] border-2 border-[color:var(--secondary)] bg-[color:var(--primary)] pt-1 text-center text-xs font-normal text-[color:var(--secondary)] transition-all duration-300",
                  globalStyling.border_radius === "full"
                    ? "-left-0.5 -top-0.5"
                    : "-left-1.5 -top-1.5"
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
