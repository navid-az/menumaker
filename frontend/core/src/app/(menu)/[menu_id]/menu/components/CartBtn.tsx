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
import useConditionalAnimation from "@/app/hooks/useConditionalAnimation";

//types
import { type CategoriesType } from "./Items/MenuItemsWrapper";
import { type MenuItemType } from "./Items/MenuItem";

function CartBtn() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/${"venhan"}/categories`
      );
      return data as CategoriesType[];
    },
  });

  if (isError) {
    const errorMessage = (error as Error).message;
    return <span>Error: {errorMessage}</span>;
  }

  const cartBtnRef = useRef<HTMLButtonElement>(null);

  const cartItems = useItemCart((state) => state.items);

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

  const DrawerIsOpen = useMenuItemDrawer((state) => state.isOpen);

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
  }, [cartItems, DrawerIsOpen]);

  //add animations
  useConditionalAnimation(cartBtnRef, ["tactile"]);

  return (
    <Button
      ref={cartBtnRef}
      asChild
<<<<<<< HEAD
      className="!fixed bottom-[-80px] left-0 right-0 z-50 m-3 flex h-max items-center justify-between rounded-full bg-orange-300 p-1.5 shadow-2xl xs:p-2"
=======
      className="!fixed bottom-[-80px] left-0 right-0 z-50 m-3 flex h-16 items-center justify-between rounded-full bg-orange-300 p-1.5 shadow-2xl xs:p-2"
>>>>>>> 88eb1fa3c051b0c307bdde8f1b7e935f2056eed5
    >
      <Link href={`/venhan/orders`}>
        <div className=" flex items-center pr-2">
          <p className="text-lg font-medium text-orange-900 xs:text-xl xs:font-semibold">
            ثبت سفارش
          </p>
        </div>
        <section className="flex flex-shrink flex-row-reverse justify-start -space-x-4 ltr:space-x-reverse">
          {matchingItems.slice(0, 3).map((item) => (
            <div
              key={item.item.id}
              className="relative h-11 w-11 rounded-full border-2 border-orange-300 shadow-sm transition-all duration-300 xs:h-12 xs:w-12"
            >
              <Image
                fill
                src={"http://127.0.0.1:8000/" + item.item.image}
                alt={item.item.name}
                className="rounded-full object-cover"
              ></Image>
              <div className="absolute left-0 top-0 z-10 h-4 w-4 rounded-full border border-orange-300 bg-orange-950 pt-0.5 text-center text-xs font-light text-orange-300 transition-all duration-300 xs:h-5 xs:w-5 xs:font-normal">
                {item.count}
              </div>
            </div>
          ))}
          {matchingItems.length > 3 && (
            <div className="h-11 w-11 rounded-full border-2 border-orange-300 bg-orange-950 pt-3 text-center text-orange-200 shadow-sm transition-all duration-300 xs:h-12 xs:w-12">
              <p>{matchingItems.length - 3}+</p>
            </div>
          )}
        </section>
      </Link>
    </Button>
  );
}

export default CartBtn;
