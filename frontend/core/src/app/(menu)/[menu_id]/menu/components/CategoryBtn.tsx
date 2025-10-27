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
import { MenuGlobalStylingUI } from "@/app/types/ui/menu";
import { type AnimationConfigType } from "@/components/global/InteractiveWrapper";
type CategoryBtnType = {
  icon?: { name: string; image: string };
  parentType?: string;
  globalStyling: MenuGlobalStylingUI;
};

//hooks
import { useCategoryBtn } from "@/lib/stores";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation"; //animation hook
import { useRippleAnimation } from "@/app/hooks/useRippleAnimation"; //animation hook

const buttonVariants = cva(
  `flex-none select-none transition-colors duration-500`,
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
        default: "rounded-full",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      types: "horizontal",
      size: "default",
      variant: "default",
      borderRadius: "default",
    },
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CategoryBtnType,
    VariantProps<typeof buttonVariants> {}

export default function CategoryBtn({
  name,
  icon,
  parentType,
  id,
  variant,
  className,
  size,
  globalStyling,
}: ButtonProps) {
  const [isIconOnly, setIsIconOnly] = useState(false);
  const [lastChangeByClick, setLastChangeByClick] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  //component specific animation settings
  const AddToCartBtnAnimationConfigs: AnimationConfigType = {
    ripple: { duration: 1200, size: 100, color: globalStyling.secondary_color },
    tactile: {},
  };
  const ripple = useRippleAnimation(
    rippleRef,
    AddToCartBtnAnimationConfigs.ripple,
    globalStyling.click_animation_enabled &&
      globalStyling.click_animation_type?.includes("ripple")
  );
  const tactile = useTactileAnimation(
    buttonRef,
    AddToCartBtnAnimationConfigs.tactile,
    globalStyling.click_animation_enabled &&
      globalStyling.click_animation_type?.includes("tactile")
  );

  const { activeCategory, updateActiveCategory, updateIsAutoScrolling } =
    useCategoryBtn();

  const shouldAutoAnimate = useCategoryBtn((state) => state.shouldAutoAnimate);
  const updateShouldAutoAnimate = useCategoryBtn(
    (state) => state.updateShouldAutoAnimate
  );

  // Change style depending on icon/name availability
  useEffect(() => {
    if (!name && icon) {
      setIsIconOnly(true);
    } else {
      setIsIconOnly(false);
    }
  }, [name, icon]);

  //scroll to the target category
  useEffect(() => {
    if (buttonRef.current && activeCategory === id) {
      const button = buttonRef.current;
      const container = button.parentElement;

      if (container) {
        const buttonLeft = button.offsetLeft;
        const scrollTo = buttonLeft - 16;

        container.scrollTo({
          left: scrollTo,
          behavior: "smooth",
        });
      }

      // Only auto animate if category changed via scrolling
      if (!lastChangeByClick) {
        ripple();
        tactile();
      }

      setLastChangeByClick(false); // reset flag
      updateShouldAutoAnimate(true);
    }
  }, [activeCategory]);

  const handleClick = () => {
    setLastChangeByClick(true);
  };

  //move to the related items on click
  const moveToCat = () => {
    handleClick();
    updateShouldAutoAnimate(false);
    updateIsAutoScrolling(true); // <--- lock observer

    if (id) {
      updateActiveCategory(id);
      const categoryTitle = document.getElementById(id);
      const verticalCategoriesNavHeight = 72;

      if (categoryTitle) {
        window.scroll({
          top:
            window.scrollY +
            categoryTitle.getBoundingClientRect().top -
            (parentType != "vertical" ? verticalCategoriesNavHeight : 0),
          behavior: "smooth",
        });

        setTimeout(() => {
          updateIsAutoScrolling(false);
        }, 600);
      }
    }
  };

  return (
    <div ref={buttonRef} className="w-max h-max">
      <Button
        onClick={moveToCat}
        id={`category-${id}`}
        style={
          parentType === "vertical"
            ? {
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }
            : undefined
        }
        className={cn(
          "scale-pro h-10 flex-none relative select-none rounded-(--radius-base) border-2 bg-(--primary) px-4 py-2 text-(--secondary) transition-[color,box-shadow,border-radius,border-color,font-size] duration-300",
          globalStyling.style === "retro" &&
            "border-3 border-(--secondary) shadow-[4px_4px_0px_0px_var(--secondary)] font-bold",
          globalStyling.style === "retro" &&
            parentType === "vertical" &&
            " shadow-[-4px_-4px_0px_0px_var(--secondary)]",
          activeCategory === id
            ? " border-(--secondary) shadow-[0px_0px_0px_0px_var(--secondary)]"
            : globalStyling.style === "retro"
              ? "border-(--secondary)"
              : "border-(--secondary)/20",
          parentType === "vertical" &&
            "h-auto w-10 flex items-center justify-center p-4",
          className
        )}
      >
        <div
          onClick={handleClick}
          ref={rippleRef}
          className="absolute w-full h-full scale-pro rounded-(--radius-base)"
        ></div>
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
    </div>
  );
}
