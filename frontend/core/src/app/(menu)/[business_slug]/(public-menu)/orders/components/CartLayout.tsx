"use client";

import React, { useState, useEffect } from "react";

//components
import Link from "next/link";
import { Button } from "@/components/ui/button";
import OrderList from "./OrderList";
import { toast } from "sonner";

//SVGs
import { ArrowLeft, ConciergeBell } from "lucide-react";

//libraries
import { cn } from "@/lib/utils";

//providers
import { usePreview } from "@/app/(creator)/builder/components/preview/PreviewContext";

//actions
import { placeOrder } from "@/app/actions/menu/order";

//hooks
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/stores";

//types
import { type MenuItem, type Order } from "@/app/types/api/menu";
import { type MenuGlobalStylingUI } from "@/app/types/ui/menu";
type CartLayoutProps = {
  items: MenuItem[];
  globalStyling: MenuGlobalStylingUI;
  businessSlug?: string;
};

export default function CartLayout({
  items,
  globalStyling,
  businessSlug,
}: CartLayoutProps) {
  const { isPreview, setActivePage } = usePreview();
  const { cartItems, resetCart } = useCart();

  const placeOrderDisabled = cartItems.length === 0;

  const [sessionCode, setSessionCode] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const table_code = searchParams.get("t");

  // Get table session code form sessionStorage
  useEffect(() => {
    const code = sessionStorage.getItem("session_code");
    setSessionCode(code);
  }, []);

  const handlePlaceOrder = async () => {
    if (!sessionCode) {
      toast.error("کد سشن دریافت نشد، لطفا مجددا QR کد را اسکن کنید");
    } else {
      const orderData: Order = {
        session_code: sessionCode,
        notes: "",
        items: cartItems.map((cartItem) => ({
          item: cartItem.id,
          quantity: cartItem.quantity,
        })),
      };
      const res = await placeOrder("niavaran-1-1", orderData);
      if (res.success) {
        resetCart();
        toast.success("سفارش شما به آشپزخانه ارسال شد");
      } else {
        toast.error("خطایی در ثبت سفارش رخ داد، لطفا مجددا امتحان کنید");
      }
    }
  };

  return (
    <div className="container flex h-full flex-col justify-between bg-(--bg) gap-8 p-4">
      <header className="flex items-center justify-between">
        <h3 className="text-lg text-(--secondary)">لیست سفارشات</h3>
        <Button
          onClick={() => isPreview && setActivePage("menu")}
          size="icon"
          className={cn(
            "rounded-(--radius-base) bg-[var(--waiter-btn-bg)] text-[var(--waiter-btn-text)] transition-all duration-300",
            globalStyling.style === "retro" &&
              "border-3 font-bold shadow-[4px_4px_0px_0px_var(--secondary)] border-(--secondary)"
          )}
        >
          {isPreview ? (
            <ArrowLeft
              className={cn(
                "text-(--secondary) transition-all duration-300",
                globalStyling.style === "retro" && "stroke-[2.5]"
              )}
            ></ArrowLeft>
          ) : (
            <Link href={`/${businessSlug}/menu?t=${table_code}`}>
              <ArrowLeft></ArrowLeft>
            </Link>
          )}
        </Button>
      </header>
      <OrderList data={items} globalStyling={globalStyling} />
      <footer className="flex gap-4">
        <Button
          disabled={placeOrderDisabled}
          className={cn(
            "h-12 basis-9/12 rounded-(--radius-base) bg-(--primary) text-base text-(--secondary) transition-all duration-300",
            globalStyling.style === "retro" &&
              `border-3 border-(--secondary) ${
                !placeOrderDisabled &&
                "shadow-[4px_4px_0px_0px_var(--secondary)]"
              }`
          )}
          onClick={handlePlaceOrder}
        >
          ثبت سفارش
        </Button>
        <Button
          size="icon"
          className={cn(
            "h-12 basis-3/12 rounded-(--radius-base) bg-(--primary) text-(--secondary)",
            globalStyling.style === "retro" &&
              "border-3 border-(--secondary) shadow-[4px_4px_0px_0px_var(--secondary)]"
          )}
        >
          <ConciergeBell />
        </Button>
      </footer>
    </div>
  );
}
