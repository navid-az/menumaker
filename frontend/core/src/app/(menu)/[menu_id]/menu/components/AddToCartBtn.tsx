"use client";

import React, { useEffect, useState } from "react";

//SVGs
import { Minus, Plus, Trash } from "@/app/components/svgs";

//components
import { Button } from "@/components/ui/button";
import InteractiveWrapper, {
  type AnimationVariantType,
} from "@/components/global/InteractiveWrapper";

//libraries
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

//functions
import mapAnimationsToConfigs from "@/lib/mapAnimationsToConfigs";

//hooks
import { useItemCart } from "@/lib/stores";

//types
import { type AnimationConfigType } from "@/components/global/InteractiveWrapper";
type AddToCartBtnType = {
  itemId: number;
  primaryColor: string;
  secondaryColor: string;
  animations?: AnimationVariantType[];
};
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    AddToCartBtnType,
    VariantProps<typeof AddToCartBtnVariants> {}

//component variants
const AddToCartBtnVariants = cva(
  `flex items-center justify-between transition-all`,
  {
    variants: {
      size: {
        default: "h-10 p-1",
        sm: "h-9 rounded-md p-1",
        lg: "h-11 rounded-md p-1.5",
      },
      variant: {
        default: "",
        minimal: "",
        classic: "",
      },
      borderRadius: {
        default: "rounded-full",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      borderRadius: "default",
    },
  }
);

export default function AddToCartBtn({
  itemId,
  primaryColor,
  secondaryColor,
  size,
  borderRadius,
  variant,
  className,
  animations = [],
}: ButtonProps) {
  const cartItems = useItemCart((state) => state.items);
  const incrementItemCount = useItemCart((state) => state.incrementItemCount);
  const decrementItemCount = useItemCart((state) => state.decrementItemCount);
  const removeItem = useItemCart((state) => state.removeItem);
  const addItem = useItemCart((state) => state.updateItems);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      setQuantity(item.count);
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
  const handleAdd = () => {
    addItem(itemId);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={cn(
        AddToCartBtnVariants({ variant, size, borderRadius, className })
      )}
      style={{ background: secondaryColor }}
    >
      {quantity > 0 ? (
        <>
          <ValueChangerBtn
            name="increase"
            action={handleIncrement}
            iconSrc="plus"
            borderRadius={borderRadius}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            animations={animations}
          ></ValueChangerBtn>

          <span className="mt-1 flex-initial basis-4/12 text-center text-lg">
            <p className="text-2xl" style={{ color: primaryColor }}>
              {quantity}
            </p>
          </span>
          <ValueChangerBtn
            name="decrease"
            action={handleDecrement}
            iconSrc={quantity != 1 ? "minus" : "trash"}
            borderRadius={borderRadius}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            animations={animations}
          ></ValueChangerBtn>
        </>
      ) : (
        <Button
          className="h-full w-full rounded-full p-0"
          style={{
            background: secondaryColor,
            color: primaryColor,
          }}
          onClick={handleAdd}
        >
          <Plus className="h-6 w-6 ltr:mr-2 rtl:ml-2" />
          <p className="text-lg">افزودن</p>
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
  primaryColor: string;
  secondaryColor: string;
  className?: string;
  animations: AnimationVariantType[];
};

const ValueChangerBtn = ({
  name,
  iconSrc,
  action,
  borderRadius,
  primaryColor,
  secondaryColor,
  className,
  animations = [],
}: ValueChangeBtnType) => {
  //component specific animation settings
  const AddToCartBtnAnimationConfigs: AnimationConfigType = {
    ripple: { duration: 600, size: 200 },
    tactile: {},
  };

  const animationSettings = mapAnimationsToConfigs(
    AddToCartBtnAnimationConfigs,
    animations
  );

  return (
    <InteractiveWrapper asChild animations={animationSettings}>
      <Button
        name={name}
        onClick={action}
        size="icon"
        className={cn(
          `h-full w-14 ${
            borderRadius === "lg"
              ? "rounded-lg"
              : borderRadius === "md"
              ? "rounded-md"
              : borderRadius === "sm"
              ? "rounded-sm"
              : "rounded-full"
          }`,
          className
        )}
        style={{
          background: primaryColor,
          color: secondaryColor,
        }}
      >
        {iconSrc == "minus" ? (
          <Minus className="h-full w-full" />
        ) : iconSrc == "trash" ? (
          <Trash className="h-full w-full" />
        ) : (
          <Plus className="h-full w-full" />
        )}
      </Button>
    </InteractiveWrapper>
  );
};
