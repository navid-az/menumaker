"use client";

import React, { CSSProperties, useRef } from "react";

//components
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import PriceTag from "../PriceTag";
import AddToCartBtn from "../AddToCartBtn";

//hooks
import { useMenuItemDrawer } from "@/lib/stores";
import { useRippleAnimation } from "@/app/hooks/useRippleAnimation";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

//SVGs
import mapAnimationsToConfigs from "@/lib/mapAnimationsToConfigs";

//types
import {
  type AnimationConfigType,
  type AnimationVariantType,
} from "@/components/global/InteractiveWrapper";
import { type MenuGlobalStylingUI } from "@/app/types/ui/menu";
import { type ItemsDisplayType, type MenuItem } from "@/app/types/api/menu";
export type MenuItemCardProps = MenuItem & {
  style: ItemsDisplayType;
  globalStyling: MenuGlobalStylingUI;
};

//utils
import { generateStyleVars } from "../../../utilities/styleVars";

//libraries
import { cn } from "@/lib/utils";

export function MenuItemCard({
  id,
  name,
  description,
  image,
  price,
  is_active = true,
  is_available = false,
  is_featured = false,
  style,
  globalStyling,
}: MenuItemCardProps) {
  //generate style variables
  const colors = [
    globalStyling.primary_color,
    globalStyling.secondary_color,
    globalStyling.tertiary_color,
    globalStyling.bg_color,
  ];
  const styleVars = generateStyleVars(colors, globalStyling.border_radius);

  //change the value of drawerIsOpen global state
  const setDrawerIsOpen = useMenuItemDrawer((state) => state.updateIsOpen);
  const handleDrawer = () => {
    setDrawerIsOpen();
  };

  const animationRef = useRef(null);

  //component specific animation settings
  const MenuItemAnimationConfigs: AnimationConfigType = {
    ripple: { duration: 600, size: 200, color: globalStyling.secondary_color },
    tactile: { scale: 0.02 },
  };
  useRippleAnimation(
    animationRef,
    MenuItemAnimationConfigs.ripple,
    globalStyling.click_animation_enabled &&
      globalStyling.click_animation_type?.includes("ripple")
  );
  useTactileAnimation(
    animationRef,
    MenuItemAnimationConfigs.tactile,
    globalStyling.click_animation_enabled &&
      globalStyling.click_animation_type?.includes("tactile")
  );

  const animationConfigs = mapAnimationsToConfigs(
    MenuItemAnimationConfigs,
    globalStyling.click_animation_type
  );

  return (
    <Drawer setBackgroundColorOnScale={false} onOpenChange={handleDrawer}>
      <DrawerTrigger
        className="scale-pro rounded-(--radius-exception)"
        ref={animationRef}
        asChild
      >
        {is_featured ? (
          <div className="col-span-2 flex h-[300px] flex-none flex-col">
            <div className="relative flex h-full w-full">
              <Image
                className="rounded-t-(--radius-exception) object-cover object-top transition-all duration-300"
                src={`http://127.0.0.1:8000${image}`}
                alt={name}
                fill
              ></Image>
            </div>
            <div
              className={`flex w-full flex-none shrink-0 gap-4 basis-5/12 flex-col justify-between rounded-b-(--radius-exception) bg-(--primary) text-(--secondary) p-2 transition-all duration-300`}
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">{name}</p>
                  <PriceTag
                    className="pl-1"
                    unitDisplayType="compact"
                    removeZeroes
                    price={price}
                  ></PriceTag>
                </div>
                <p className="text-sm font-light text-(--secondary)/80">
                  {description}
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <AddToCartBtn
                  className="max-w-5/12 self-end"
                  itemId={id}
                  globalStyling={globalStyling}
                ></AddToCartBtn>
              </div>
            </div>
          </div>
        ) : style === "half-image-stacked" ? (
          <div
            className={cn(
              "flex h-[300px] flex-none flex-col xss:col-span-1 border-(--secondary) text-[var(--contrast-on-primary)] transition-[box-shadow,border-radius] duration-300",
              globalStyling.style === "retro" &&
                "border-3 shadow-[4px_4px_0px_0px_var(--secondary)]"
            )}
          >
            <div className="relative flex basis-6/6 w-full">
              <Image
                className="rounded-t-(--radius-exception) object-cover absolute -z-5 transition-all duration-300"
                src={`http://127.0.0.1:8000${image}`}
                alt={name}
                fill
              ></Image>
            </div>
            <div
              className={cn(
                `relative bottom-0 flex w-full flex-none shrink-0 basis-5/12 flex-col justify-between gap-3 rounded-b-(--radius-exception) bg-(--primary) p-2 text-(--secondary) transition-[border-radius] duration-300`,
                globalStyling.style === "retro" &&
                  "border-t-3 border-(--secondary)"
              )}
            >
              <div className="space-y-0.5">
                <p
                  className={cn(
                    `font-semibold`,
                    name.length > 20 ? "text-sm" : "text-lg",
                    globalStyling.style === "retro" && "font-black"
                  )}
                >
                  {name}
                </p>
                <PriceTag
                  unitDisplayType={globalStyling.unit_display_type}
                  size="sm"
                  price={price}
                ></PriceTag>
              </div>
              <AddToCartBtn
                itemId={id}
                globalStyling={globalStyling}
              ></AddToCartBtn>
            </div>
          </div>
        ) : style === "full-bleed-overlay" ? (
          <div
            className={cn(
              "relative flex h-[300px] flex-none flex-col xss:col-span-1 transition-[box-shadow,border,border-radius] duration-300",
              globalStyling.style === "retro" &&
                "border-3 border-(--secondary) shadow-[4px_4px_0px_0px_var(--secondary)]"
            )}
          >
            {/* Removing -z-5 will apply ripple animation effect BEHIND the image
            This only works if the element doesn't have a background(png) */}
            <Image
              className="rounded-(--radius-exception) absolute -z-5 object-cover "
              src={`http://127.0.0.1:8000${image}`}
              alt={name}
              fill
            ></Image>
            <div
              className={`absolute bottom-0 flex w-full h-full justify-end flex-none  shrink-0 flex-col gap-3 from-20% rounded-(--radius-exception) bg-linear-to-t from-(--primary)/90 to-transparent to-60% p-2 text-(--secondary)`}
            >
              <div className="space-y-0.5">
                <p
                  className={`font-semibold ${
                    name.length > 20 ? "text-sm" : "text-lg"
                  }`}
                >
                  {name}
                </p>
                <PriceTag
                  unitDisplayType={globalStyling.unit_display_type}
                  className="text-(--secondary)/80"
                  size="sm"
                  price={price}
                ></PriceTag>
              </div>
              <AddToCartBtn
                itemId={id}
                globalStyling={globalStyling}
              ></AddToCartBtn>
            </div>
          </div>
        ) : (
          ""
        )}
      </DrawerTrigger>
      <DrawerContent
        style={styleVars as CSSProperties}
        className="rounded-t-3xl border-0 bg-(--bg,_#ffffff) pt-1.5"
      >
        {/* drawer handle */}
        <div className="mx-auto mb-1.5 h-2 w-[100px] rounded-full bg-(--secondary)"></div>

        <div className="w-full px-1.5 backdrop-blur-4xl flex justify-center items-center">
          <Image
            className="object-contain"
            src={`http://127.0.0.1:8000${image}`}
            alt={name}
            width={384}
            height={0}
          />
        </div>
        <DrawerHeader className="flex flex-col text-right">
          <div className="flex w-full items-center justify-between text-(--primary)">
            <DrawerTitle className="text-xl xss:text-2xl">{name}</DrawerTitle>
            <PriceTag
              size="lg"
              price={price}
              unitDisplayType="compact"
            ></PriceTag>
          </div>
          <DrawerDescription className="text-right font-light text-(--primary) ltr:text-left">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <AddToCartBtn
            itemId={id}
            globalStyling={globalStyling}
          ></AddToCartBtn>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
