"use client";

import { useState, useEffect } from "react";

//hooks
import { useItemCart } from "@/lib/stores";

//components
import CartItem from "./CartItem";
import PriceTag from "../../menu/components/PriceTag";

//SVGs
import { ShoppingBag } from "lucide-react";

//types
import { type MenuItemType } from "../../menu/components/Items/MenuItem";
export type ValidItemType = { item: MenuItemType; count?: number };

export default function OrderList({ data }: { data: MenuItemType[] }) {
  const cartItems = useItemCart((state) => state.items);

  const [totalPrice, setTotalPrice] = useState(0);
  const [validItems, setValidItems] = useState<ValidItemType[]>();

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
  }, [cartItems]);

  return (
    <section className="flex h-full flex-col gap-4">
      {cartItems.length > 0 ? (
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
  );
}
