"use client";

import React, { useEffect, useRef, useState } from "react";

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
import { type MenuGlobalStylingUI } from "@/app/types/ui/menu";
import { useRippleAnimation } from "@/app/hooks/useRippleAnimation";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";
type AddToCartBtnType = {
  itemId: number;
  globalStyling: MenuGlobalStylingUI;
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
        "flex h-10 w-full justify-center gap-2 rounded-(--radius-inner) bg-(--secondary) transition-all duration-300",
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
          <span className="mt-1 flex-initial basis-2/12 text-center text-lg text-(--primary)">
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
          className="h-full w-full rounded-full bg-(--secondary) text-(--primary)"
          onClick={handleAdd}
        >
          <Plus
            className={cn(
              "h-6 w-6",
              globalStyling.style === "retro" && "stroke-2"
            )}
          />
          <p
            className={cn(
              "text-base",
              globalStyling.style === "retro" && "font-bold"
            )}
          >
            افزودن
          </p>
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
  globalStyling: MenuGlobalStylingUI;
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
    ripple: { duration: 1200, size: 100, color: globalStyling.secondary_color },
    tactile: { scale: 0.05 },
  };
  const buttonRef = useRef<HTMLButtonElement>(null);
  useRippleAnimation(
    buttonRef,
    AddToCartBtnAnimationConfigs.ripple,
    globalStyling.click_animation_enabled &&
      globalStyling.click_animation_type?.includes("ripple")
  );
  useTactileAnimation(
    buttonRef,
    AddToCartBtnAnimationConfigs.tactile,
    globalStyling.click_animation_enabled &&
      globalStyling.click_animation_type?.includes("tactile")
  );

  return (
    <Button
      ref={buttonRef}
      name={name}
      onClick={action}
      size="icon"
      className={cn(
        "scale-pro h-full w-24 flex-initial rounded-(--radius-inner-alt) bg-(--primary) text-(--secondary) transition-[border-radius] duration-300",
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
