"use client";

import { useEffect, useRef, useState } from "react";

//libraries
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

//functions
import lightenDarkenColor from "@/lib/lightenDarkenColor";

//data(instance)
const categoryData = {
  type: "horizontal",
  primary_color: "#431407",
  secondary_color: "#fdba74",
  show_background: false,
  animation: ["ripple", "tactile"],
};

//hooks
import { useCategoryBtn } from "@/lib/stores";
import useConditionalAnimation from "@/app/hooks/useConditionalAnimation";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation"; //animation hook
import { useRippleAnimation } from "@/app/hooks/useRippleAnimation"; //animation hook

//types
import type { AnimationVariant } from "@/app/hooks/useConditionalAnimation";
type ItemType = {
  id: number;
  menu: string;
  category: string;
  name: string;
  description: string;
  image: string;
  price: number;
  is_available: boolean;
  is_active: boolean;
};
type CategoryType = {
  id: number;
  name: string;
  icon: { name: string; image: string };
  is_active: boolean;
  items: ItemType[];
};
type ItemCategoryType = {
  params: { menu_id: number };
  type?: "vertical" | "horizontal";
  variant?: "minimal" | "classic";
  isSticky?: boolean;
  hasBackGround?: boolean;
  allowAnimation?: boolean;
};

export default function ItemsCategory({
  params,
  type = "horizontal",
  variant = "minimal",
  isSticky = true,
  hasBackGround = false,
  allowAnimation = true,
}: ItemCategoryType) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/menu/single/${params.menu_id}`
      );
      return data;
    },
  });

  if (isError) {
    const errorMessage = (error as Error).message;
    return <span>Error: {errorMessage}</span>;
  }

  return (
    <div
      className={`hide-scrollbar avoid-stretch backdrop-blur-lg ${
        isSticky && "sticky"
      } top-0 z-50 flex overflow-y-auto ${
        hasBackGround && "bg-primary"
      } p-2 transition-all ${
        type == "horizontal"
          ? "w-full flex-row gap-2"
          : "flex-color h-screen w-2/12 flex-col gap-4"
      }`}
    >
      {!isLoading ? (
        <>
          {data["categories"].map(
            (category: CategoryType) =>
              category.is_active &&
              category["items"].length > 0 && (
                <CategoryBtn
                  key={category.id}
                  id={category.id.toString()}
                  name={category.name}
                  parentType={type}
                  animationType={allowAnimation ? ["tactile", "ripple"] : []}
                  icon={category.icon.image}
                  style={{
                    background: categoryData.secondary_color,
                    color: categoryData.primary_color,
                  }}
                ></CategoryBtn>
              )
          )}
        </>
      ) : (
        <>
          {type === "horizontal" ? (
            <>
              <CategoryBtnSkeleton className="w-20"></CategoryBtnSkeleton>
              <CategoryBtnSkeleton className="w-16"></CategoryBtnSkeleton>
              <CategoryBtnSkeleton className="w-24"></CategoryBtnSkeleton>
              <CategoryBtnSkeleton className="w-24"></CategoryBtnSkeleton>
              <CategoryBtnSkeleton className="w-16"></CategoryBtnSkeleton>
            </>
          ) : (
            <>
              <CategoryBtnSkeleton></CategoryBtnSkeleton>
              <CategoryBtnSkeleton></CategoryBtnSkeleton>
              <CategoryBtnSkeleton></CategoryBtnSkeleton>
              <CategoryBtnSkeleton></CategoryBtnSkeleton>
              <CategoryBtnSkeleton></CategoryBtnSkeleton>
            </>
          )}
        </>
      )}
    </div>
  );
}

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

type CategoryBtnType = {
  icon: string;
  parentType?: string;
  animationType?: AnimationVariant[];
  animationOnSelect?: "border" | "background" | "border-background";
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CategoryBtnType,
    VariantProps<typeof buttonVariants> {}

function CategoryBtn({
  name,
  icon,
  parentType,
  id,
  variant,
  animationType,
  borderRadius,
  className,
  style,
  size,
}: ButtonProps) {
  const [isIconOnly, setIsIconOnly] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const activeCategory = useCategoryBtn((state) => state.activeCategory);
  const setActiveCategory = useCategoryBtn(
    (state) => state.updateActiveCategory
  );

  useEffect(() => {
    if (!name && icon) {
      setIsIconOnly(true);
    } else {
      setIsIconOnly(false);
    }
  }, [name, icon]);

  const triggerTactileAnimation = useTactileAnimation(buttonRef, {});
  const triggerRippleAnimation = useRippleAnimation(buttonRef, {});

  //style active CategoryBtn
  useEffect(() => {
    if (buttonRef.current) {
      if (activeCategory === id) {
        buttonRef.current.style.background = lightenDarkenColor(
          categoryData.secondary_color,
          30
        );
        buttonRef.current.style.border = `2px solid ${categoryData.primary_color}`;
        //programmatically trigger animations
        triggerTactileAnimation();
        triggerRippleAnimation();
      } else {
        buttonRef.current.style.border = `2px solid transparent`;
        buttonRef.current.style.background = categoryData.secondary_color;
        buttonRef.current.style.color = categoryData.primary_color;
      }
    }
  }, [activeCategory]);

  //move to the related items on click
  const moveToCat = () => {
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

  //animate buttons according to animationType array(if it's not provided no animation will be executed)
  if (animationType) {
    useConditionalAnimation(buttonRef, ["ripple", "tactile"]);
  }

  return (
    <Button
      style={style}
      id={`category-${id}`}
      onClick={moveToCat}
      className={cn(buttonVariants({ variant, size, borderRadius, className }))}
      ref={buttonRef}
    >
      {icon && (
        <Image
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

//loading skeleton for category buttons
export interface CategoryBtnSkeletonType
  extends VariantProps<typeof categoryBtnSkeletonVariants> {
  parentType?: string;
  size?: "default" | "sm" | "lg" | "icon";
  animationType?: AnimationVariant[];
  className?: string;
}

const categoryBtnSkeletonVariants = cva(
  "w-20 bg-primary-foreground/50 border-2 border-transparent",
  {
    variants: {
      borderRadius: {
        default: "rounded-full",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
      borderRadius: "default",
    },
  }
);

function CategoryBtnSkeleton({
  borderRadius,
  size,
  className,
}: CategoryBtnSkeletonType) {
  return (
    <Skeleton
      className={cn(
        categoryBtnSkeletonVariants({ borderRadius, size, className })
      )}
    ></Skeleton>
  );
}
