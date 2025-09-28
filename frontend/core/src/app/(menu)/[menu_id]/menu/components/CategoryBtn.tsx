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
import { type MenuGlobalStyling } from "../page";
import { type AnimationConfigType } from "@/components/global/InteractiveWrapper";
type CategoryBtnType = {
  icon: { name: string; image: string };
  parentType?: string;
  globalStyling: MenuGlobalStyling;
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { activeCategory, updateActiveCategory, updateIsAutoScrolling } =
    useCategoryBtn();

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

      updateShouldAutoAnimate(true);
    }
  }, [activeCategory]);

  //move to the related items on click
  const moveToCat = () => {
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

        updateIsAutoScrolling(false);
      }
    }
  };

  return (
    <Button
      id={`category-${id}`}
      onClick={moveToCat}
      className={cn(
        "h-10 flex-none select-none rounded-(--radius-base) border-3 bg-(--primary) px-4 py-2 text-(--secondary) transition-colors duration-500",
        activeCategory === id ? "border-(--secondary)" : "border-(--primary)",
        className
      )}
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
