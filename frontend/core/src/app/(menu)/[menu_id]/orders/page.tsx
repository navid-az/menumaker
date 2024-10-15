"use client";

import { useEffect, useState } from "react";

//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartItem from "./components/CartItem";
import PriceTag from "../menu/components/PriceTag";

//libraries
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//SVGs
import { useItemCart } from "@/lib/stores";
import { ArrowLeft, ConciergeBell, ShoppingBag } from "lucide-react";

//types
import { type MenuItemType } from "../menu/components/Items/MenuItem";
export type ValidItemType = { item: MenuItemType; count?: number };

export default function page({ params }: { params: { menu_id: string } }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/${params.menu_id}/items`
      );
      return data as MenuItemType[];
    },
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [validItems, setValidItems] = useState<ValidItemType[]>();

  const cartItems = useItemCart((state) => state.items);

  useEffect(() => {
    //total items price
    const pr = cartItems.reduce((total, cartItem) => {
      let item = data?.find((item) => item.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.count;
    }, 0);
    setTotalPrice(pr);

    //extract items data according to IDs inside cartItems
    const validatedItems = data
      ?.filter((menuItem) =>
        cartItems.some((cartItem) => cartItem.id === menuItem.id)
      )
      .map((menuItem) => {
        const matchingCartItem = cartItems.find(
          (cartItem) => cartItem.id === menuItem.id
        );
        return {
          item: menuItem,
          count: matchingCartItem?.count,
        };
      });
    setValidItems(validatedItems);
  }, [cartItems, isLoading]);

  return (
    <div className="container flex h-screen flex-col justify-between gap-8 p-4">
      <header className="flex items-center justify-between">
        <h3 className="text-lg">لیست سفارشات</h3>
        <Button size="icon" variant="ghost" asChild>
          <Link href={`/${params.menu_id}/menu`}>
            <ArrowLeft className="h-7 w-7"></ArrowLeft>
          </Link>
        </Button>
      </header>
      <section className="flex h-full flex-col gap-4">
        {cartItems.length > 0 && !isLoading ? (
          <>
            {validItems?.map((validItem) => (
              <CartItem key={validItem.item.id} {...validItem} />
            ))}
            <div className="flex w-full items-center justify-between justify-self-center border-t-2 border-dashed border-purple-400 pt-4">
              <h2>مجموع پرداختی</h2>
              <PriceTag unitDisplayType="default" price={totalPrice} />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <ShoppingBag
              className="h-20 w-20 text-blue-950/40"
              strokeWidth={1.5}
            ></ShoppingBag>
            <p className="text-lg font-semibold text-blue-950/40">
              آیتمی در سبد شما نیست
            </p>
          </div>
        )}
      </section>
      <footer className="flex gap-4">
        <Button
          disabled
          className="h-12 basis-9/12 rounded-full bg-blue-950 text-base text-pink-200"
        >
          ثبت سفارش
        </Button>
        <Button
          className="h-12 basis-3/12 rounded-full bg-blue-950 text-pink-200"
          size="icon"
        >
          <ConciergeBell></ConciergeBell>
        </Button>
      </footer>
    </div>
  );
}
