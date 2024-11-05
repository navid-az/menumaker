"use client";

import React, { useEffect, useRef, useState } from "react";

//libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useItemCart } from "@/lib/stores";
import gsap from "gsap";

//components
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

//hooks
import { useMenuItemDrawer } from "@/lib/stores";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";
// import useConditionalAnimation from "@/app/hooks/useConditionalAnimation";

//SVGs
import { ShoppingBag } from "lucide-react";

//types
import { type CategoriesType } from "./Items/MenuItemsWrapper";
import { type MenuItemType } from "./Items/MenuItem";
import { type MenuGlobalStyling } from "../page";

type CartBtnType = {
  type?: "default" | "compact";
  globalStyling: MenuGlobalStyling;
};

export default function CartBtn({ type, globalStyling }: CartBtnType) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/${"venhan"}/categories`
      );
      return data as CategoriesType[];
    },
  });

  // if (isError) {
  //   const errorMessage = (error as Error).message;
  //   return <span>Error: {errorMessage}</span>;
  // }

  const cartBtnRef = useRef<HTMLButtonElement>(null);

  const DrawerIsOpen = useMenuItemDrawer((state) => state.isOpen);
  const cartItems = useItemCart((state) => state.items);

  //store data of items inside cartItems
  const [matchingItems, setMatchingItems] = useState<
    { item: MenuItemType; count: number }[]
  >([]);

  useEffect(() => {
    const items = cartItems
      .map((cartItem) => cartItem.id)
      .flatMap((cartItemId) => {
        if (data) {
          return data.flatMap((category) =>
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
  }, [isLoading, cartItems]);

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
        className="!fixed bottom-[-80px] left-0 right-0 z-50 m-3 flex h-max items-center justify-between rounded-full p-2 shadow-2xl xs:p-2.5"
        style={{
          backgroundColor: globalStyling.secondary_color,
          color: globalStyling.primary_color,
        }}
      >
        <Link href={`/venhan/orders`}>
          <div className=" flex items-center pr-2">
            <p
              className="text-lg font-medium xs:text-xl xs:font-semibold"
              style={{ color: globalStyling.primary_color }}
            >
              ثبت سفارش
            </p>
          </div>
          <section className="flex flex-shrink flex-row-reverse justify-start -space-x-4 ltr:space-x-reverse">
            {matchingItems.slice(0, 3).map((item) => (
              <div
                key={item.item.id}
                className="relative h-11 w-11 rounded-full border-2 shadow-sm transition-all duration-300 xs:h-12 xs:w-12"
                style={{ borderColor: globalStyling.primary_color }}
              >
                <Image
                  fill
                  src={"http://127.0.0.1:8000/" + item.item.image}
                  alt={item.item.name}
                  className="rounded-full object-cover"
                ></Image>
                <div
                  className="absolute -left-0.5 -top-0.5 z-10 h-[18px] w-[18px] rounded-full border pt-0.5 text-center text-xs font-light transition-all duration-300 xs:h-5 xs:w-5 xs:font-normal"
                  style={{
                    backgroundColor: globalStyling.primary_color,
                    color: globalStyling.secondary_color,
                    borderColor: globalStyling.secondary_color,
                  }}
                >
                  {item.count}
                </div>
              </div>
            ))}
            {matchingItems.length > 3 && (
              <div
                className="h-11 w-11 rounded-full border-2  pt-3 text-center shadow-sm transition-all duration-300 xs:h-12 xs:w-12"
                style={{
                  backgroundColor: globalStyling.primary_color,
                  color: globalStyling.secondary_color,
                  borderColor: globalStyling.secondary_color,
                }}
              >
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
          className="relative h-14 w-14 rounded-full shadow-inner"
          style={{ backgroundColor: globalStyling.secondary_color }}
          size="icon"
        >
          <Link href={`/venhan/orders`}>
            <ShoppingBag
              className="h-6 w-6"
              style={{
                color: globalStyling.primary_color,
              }}
            ></ShoppingBag>
            {totalItemCount >= 1 && (
              <div
                className="absolute -left-0.5 -top-0.5 z-10 h-6 w-6 rounded-full border-2 pt-1 text-center text-xs font-normal transition-all duration-300"
                style={{
                  backgroundColor: globalStyling.primary_color,
                  color: globalStyling.secondary_color,
                  borderColor: globalStyling.secondary_color,
                }}
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
