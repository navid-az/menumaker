"use client";

import { useEffect, useRef, useState } from "react";

//libraries
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";

//functions
import lightenDarkenColor from "@/lib/lightenDarkenColor";
import mapAnimationsToConfigs from "@/lib/mapAnimationsToConfigs";

//types
import { type AnimationConfigType } from "@/components/global/InteractiveWrapper";
import { type AnimationVariantType } from "@/components/global/InteractiveWrapper";
type CategoryBtnType = {
  icon: string;
  parentType?: string;
  animations?: AnimationVariantType[];
  colors: string[];
  globalBorderRadius: "full" | "lg" | "md" | "sm";
};

//hooks
import { useCategoryBtn } from "@/lib/stores";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation"; //animation hook
import { useRippleAnimation } from "@/app/hooks/useRippleAnimation"; //animation hook

const buttonVariants = cva(
  `flex-none select-none transition-[border-color,border-radius,background-color] duration-300`,
  {
    variants: {
      types: { vertical: "", horizontal: "" },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6",
      },
      variant: {
        default: "",
        minimal: "",
        classic: "",
      },
      borderRadius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      types: "horizontal",
      size: "default",
      variant: "default",
      borderRadius: "full",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CategoryBtnType,
    VariantProps<typeof buttonVariants> {}

export default function CategoryBtnPreview({
  name,
  icon,
  parentType,
  id,
  variant,
  className,
  size,
  animations = [],
  colors,
  globalBorderRadius,
}: ButtonProps) {
  const [isIconOnly, setIsIconOnly] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const activeCategory = useCategoryBtn((state) => state.activeCategory);
  const setActiveCategory = useCategoryBtn(
    (state) => state.updateActiveCategory
  );
  const shouldAutoAnimate = useCategoryBtn((state) => state.shouldAutoAnimate);
  const updateShouldAutoAnimate = useCategoryBtn(
    (state) => state.updateShouldAutoAnimate
  );

  useEffect(() => {
    if (!name && icon) {
      setIsIconOnly(true);
    } else {
      setIsIconOnly(false);
    }
  }, [name, icon]);

  //component specific animation settings
  const categoryBtnAnimationConfigs: AnimationConfigType = {
    ripple: {},
    tactile: {},
  };

  //Function to map selected animations to their configs
  const animationConfig = mapAnimationsToConfigs(
    categoryBtnAnimationConfigs,
    animations
  );

  //animations on click
  const triggerRippleAnimation = useRippleAnimation(
    buttonRef,
    animationConfig.ripple,
    !!animationConfig.ripple
  );
  const triggerTactileAnimation = useTactileAnimation(
    buttonRef,
    animationConfig.tactile,
    !!animationConfig.tactile
  );

  //style active CategoryBtn
  useEffect(() => {
    if (buttonRef.current) {
      if (activeCategory === id) {
        buttonRef.current.style.background = lightenDarkenColor(colors[1], 20);
        buttonRef.current.style.border = `2px solid ${colors[0]}`;
        //programmatically trigger animations
        if (shouldAutoAnimate) {
          if (animationConfig.ripple) {
            triggerRippleAnimation();
          }
          if (animationConfig.tactile) {
            triggerTactileAnimation();
          }
        }
        updateShouldAutoAnimate(true);
      } else {
        buttonRef.current.style.border = `2px solid transparent`;
        buttonRef.current.style.background = colors[1];
        buttonRef.current.style.color = colors[0];
      }
    }
  }, [activeCategory]);

  //move to the related items on click
  const moveToCat = () => {
    updateShouldAutoAnimate(false);
    if (id) {
      setActiveCategory(id);

      const categoryTitle = document.getElementById(id);
      const verticalCategoriesNavHeight = 56;

      if (categoryTitle) {
        window.scroll({
          top:
            window.scrollY +
            categoryTitle.getBoundingClientRect().top -
            (parentType != "vertical" ? verticalCategoriesNavHeight : 0),
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <Button
      id={`category-${id}`}
      onClick={moveToCat}
      className={cn(buttonVariants({ variant, size, className }))}
      style={{
        backgroundColor: colors ? colors[1] : "blue",
        color: colors ? colors[0] : "blue",
        borderRadius:
          globalBorderRadius === "full"
            ? "20px"
            : globalBorderRadius === "lg"
            ? "14px"
            : globalBorderRadius === "md"
            ? "7px"
            : "3px",
      }}
      ref={buttonRef}
    >
      {icon && (
        <Image
          priority
          className={`${isIconOnly ? "ml-0" : "ltr:mr-2 rtl:ml-2"} ${
            !isIconOnly && size === "lg" ? "ml-4" : ""
          }`}
          src={"http://localhost:8000" + icon}
          width={size === "lg" ? 28 : size === "sm" ? 22 : 24}
          height={size === "lg" ? 28 : size === "sm" ? 22 : 24}
          alt={name || "icon"}
        ></Image>
      )}
      <p className={`${size === "lg" ? " text-lg font-bold" : "text-base"}`}>
        {name}
      </p>
    </Button>
  );
}
