"use client";

import React, { useEffect, useRef, useState } from "react";

//SVGs
import { Plus, Minus, X } from "lucide-react";

//components
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

//libraries
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

//functions
import { toPersianDigits } from "../../../utilities/formatCurrency";
import mapAnimationsToConfigs from "@/lib/mapAnimationsToConfigs";

//hooks
import { useCart } from "@/lib/stores";
import { useRippleAnimation } from "@/app/hooks/useRippleAnimation";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//types
import { type AnimationConfigType } from "@/components/global/InteractiveWrapper";
import { type MenuGlobalStylingUI } from "@/app/types/ui/menu";
type AddToCartBtnType = {
  itemId: number;
  globalStyling: MenuGlobalStylingUI;
  itemHasOptions?: boolean;
  isAvailable?: boolean
};
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  AddToCartBtnType { }

export default function AddToCartBtn({
  itemId,
  className,
  globalStyling,
  itemHasOptions = false,
  onClick,
  isAvailable
}: ButtonProps) {
  const {
    cartItems,
    incrementItemCount,
    decrementItemCount,
    removeItem,
    updateItems,
  } = useCart();

  const [quantity, setQuantity] = useState(0);

  const t = useTranslations('globalComponents.addToCartBtn')
  const locale = useLocale()

  useEffect(() => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      setQuantity(item.quantity);
    } else {
      setQuantity(0);
    }
  }, [cartItems]);

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
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    // If item is unavailable, don't update the cart
    if (!isAvailable) {
      toast.error(t('toasts.isUnavailable'))
      return
    }

    onClick?.(e);
    if (itemHasOptions) return;
    updateItems(itemId);
  };
  return (
    <div
      className={cn(
        "flex w-full justify-center gap-2 rounded-(--radius-inner) bg-[var(--cart-btn-bg)] text-[var(--cart-btn-text)] transition-all duration-300",
        globalStyling.style === "retro" &&
        globalStyling.tertiary_color &&
        "border-[2.5px] border-secondary h-11",
        className
      )}
    >
      {quantity > 0 ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex w-full rtl:flex-row-reverse items-center justify-between gap-3 p-1"
        >
          <StepperBtn
            name="decrease"
            action={handleDecrement}
            iconSrc={quantity != 1 ? "minus" : "trash"}
            globalStyling={globalStyling}
          ></StepperBtn>
          <span className="rtl:mt-1 flex-initial basis-2/12 text-center text-lg">
            <p className="text-xl">{locale === 'fa' ? toPersianDigits(quantity) : quantity}</p>
          </span>
          <StepperBtn
            name="increase"
            action={handleIncrement}
            iconSrc="plus"
            globalStyling={globalStyling}
          ></StepperBtn>
        </div>
      ) : (
        <Button
          className={cn(
            "h-full w-full rounded-(--radius-inner) bg-[var(--cart-btn-bg)] text-[var(--cart-btn-text)]", !isAvailable && "grayscale-80 select-none cursor-default"
          )}
          onClick={(e) => handleAdd(e)}
        >
          {isAvailable && <Plus
            className={cn(
              "h-6 w-6",
              globalStyling.style === "retro" && "stroke-2"
            )}
          />}
          <p
            className={cn(
              "text-base",
              globalStyling.style === "retro" && "font-bold"
            )}
          >
            {isAvailable ? t('buttons.add') : t('buttons.unavailable')}
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
      onClick={action}
      name={name}
      size="icon"
      className={cn(
        "scale-pro h-full w-24 flex-initial rounded-(--radius-inner-alt) bg-[var(--cart-counter-bg)] text-[var(--cart-counter-text)] transition-[border-radius] duration-300",
        className
      )}
    >
      {iconSrc == "minus" ? (
        <Minus className="size-7" />
      ) : iconSrc == "trash" ? (
        <X className="size-7" />
      ) : (
        <Plus className="size-7" />
      )}
    </Button>
  );
};
