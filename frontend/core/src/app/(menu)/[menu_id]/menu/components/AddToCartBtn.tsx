"use client";

import React, { useEffect, useState } from "react";

//SVGs
import { Minus, Plus, Trash } from "@/app/components/svgs";

//components
import { Button } from "@/components/ui/button";

//libraries
import { cn } from "@/lib/utils";

//functions
import mapAnimationsToConfigs from "@/lib/mapAnimationsToConfigs";

//hooks
import { useItemCart } from "@/lib/stores";

//types
import { type AnimationConfigType } from "@/components/global/InteractiveWrapper";
import { type MenuGlobalStyling } from "../page";
type AddToCartBtnType = {
  itemId: number;
  globalStyling: MenuGlobalStyling;
};
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    AddToCartBtnType {}

export default function AddToCartBtn({
  itemId,
  className,
  globalStyling,
}: ButtonProps) {
  const {
    items,
    incrementItemCount,
    decrementItemCount,
    removeItem,
    updateItems,
  } = useItemCart();

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      setQuantity(item.count);
    } else {
      setQuantity(0);
    }
  }, [items]);

  const handleIncrement = () => {
    incrementItemCount(itemId);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      decrementItemCount(itemId);
    } else {
      removeItem(itemId);
    }
  };
  const handleAdd = () => {
    updateItems(itemId);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "flex h-10 w-full justify-center gap-2 rounded-[var(--radius-base)] bg-[color:var(--primary)]",
        className
      )}
    >
      {quantity > 0 ? (
        <div className="flex w-full items-center justify-between gap-3 p-1">
          <StepperBtn
            name="increase"
            action={handleIncrement}
            iconSrc="plus"
            globalStyling={globalStyling}
          ></StepperBtn>
          <span className="mt-1 flex-initial basis-2/12 text-center text-lg text-[color:var(--secondary)]">
            <p className="text-xl">{quantity}</p>
          </span>
          <StepperBtn
            name="decrease"
            action={handleDecrement}
            iconSrc={quantity != 1 ? "minus" : "trash"}
            globalStyling={globalStyling}
          ></StepperBtn>
        </div>
      ) : (
        <Button
          className="h-full w-full rounded-full bg-[color:var(--primary)] text-[color:var(--secondary)]"
          onClick={handleAdd}
        >
          <Plus className="h-6 w-6 ltr:mr-2 rtl:ml-2" />
          <p className=" text-base">افزودن</p>
        </Button>
      )}
    </div>
  );
}

type ValueChangeBtnType = {
  name: string;
  iconSrc: string;
  action: () => void;
  borderRadius?: "default" | "lg" | "md" | "sm" | null;
  className?: string;
  globalStyling: MenuGlobalStyling;
};

const StepperBtn = ({
  name,
  iconSrc,
  action,
  borderRadius,
  className,
  globalStyling,
}: ValueChangeBtnType) => {
  //component specific animation settings
  const AddToCartBtnAnimationConfigs: AnimationConfigType = {
    ripple: { duration: 600, size: 200 },
    tactile: {},
  };

  return (
    <Button
      name={name}
      onClick={action}
      size="icon"
      className={cn(
        `h-full w-24 flex-initial rounded-[var(--radius-inner)] bg-[color:var(--secondary)] text-[color:var(--primary)]`,
        className
      )}
    >
      {iconSrc == "minus" ? (
        <Minus className="h-8 w-8" />
      ) : iconSrc == "trash" ? (
        <Trash className="h-8 w-8" />
      ) : (
        <Plus className="h-8 w-8" />
      )}
    </Button>
  );
};
