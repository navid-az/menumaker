"use client";

import React, { CSSProperties } from "react";

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

//SVGs
import mapAnimationsToConfigs from "@/lib/mapAnimationsToConfigs";

//types
import {
  type AnimationConfigType,
  type AnimationVariantType,
} from "@/components/global/InteractiveWrapper";
import { type MenuGlobalStyling } from "../../page";

//utils
import { getStyleVars } from "../../../utilities/styleVars";

export type MenuItemType = {
  id: number;
  menu?: string;
  category?: number;
  name: string;
  description: string;
  image: string;
  price: number;
  is_available?: boolean;
  is_active?: boolean;
  isFeatured?: boolean;
  animations?: AnimationVariantType[];
  globalStyling: MenuGlobalStyling;
};

export function MenuItem({
  id,
  name,
  description,
  image,
  price,
  is_active = true,
  is_available = false,
  isFeatured = false,
  globalStyling,
}: MenuItemType) {
  const styleVars = getStyleVars(globalStyling);

  //change the value of drawerIsOpen global state
  const setDrawerIsOpen = useMenuItemDrawer((state) => state.updateIsOpen);
  const handleDrawer = () => {
    setDrawerIsOpen();
  };

  //component specific animation settings
  const MenuItemAnimationConfigs: AnimationConfigType = {
    ripple: { duration: 600, size: 200 },
    tactile: {},
  };

  const animationConfigs = mapAnimationsToConfigs(
    MenuItemAnimationConfigs,
    globalStyling.click_animation_type
  );

  const fullScreen = false;
  return (
    <Drawer setBackgroundColorOnScale={false} onOpenChange={handleDrawer}>
      <DrawerTrigger asChild>
        {isFeatured ? (
          <div className="relative col-span-2 flex h-[300px] flex-none flex-col">
            <div className="relative flex h-full w-full">
              <Image
                className="rounded-(--radius-base) object-cover object-top"
                src={`http://127.0.0.1:8000${image}`}
                alt={name}
                fill
              ></Image>
            </div>
            <div
              className={`flex w-full flex-none shrink-0 gap-4 basis-5/12 flex-col justify-between rounded-b-(--radius-exception) bg-(--primary) text-(--secondary) p-2`}
            >
              <div className="flex flex-col gap-2">
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
        ) : !fullScreen ? (
          <div className="relative flex h-[300px] flex-none flex-col xss:col-span-1">
            <div className="relative flex h-full w-full">
              <Image
                className="rounded-t-(--radius-exception) object-cover"
                src={`http://127.0.0.1:8000${image}`}
                alt={name}
                fill
              ></Image>
            </div>
            <div
              className={`flex w-full flex-none shrink-0 basis-5/12 flex-col justify-between gap-3 rounded-b-(--radius-exception) bg-(--primary) p-2 text-(--secondary)`}
            >
              <div className="space-y-0.5">
                <p
                  className={`font-semibold ${
                    name.length > 20 ? "text-sm" : "text-lg"
                  }`}
                >
                  {name}
                </p>
                <PriceTag size="sm" price={price}></PriceTag>
              </div>
              <AddToCartBtn
                itemId={id}
                globalStyling={globalStyling}
              ></AddToCartBtn>
            </div>
          </div>
        ) : (
          <div className="relative flex h-[300px] flex-none flex-col xss:col-span-1">
            <div className="relative flex h-full w-full">
              <Image
                className="rounded-(--radius-exception) object-cover"
                src={`http://127.0.0.1:8000${image}`}
                alt={name}
                fill
              ></Image>
            </div>
            <div
              className={`absolute bottom-0 flex w-full h-full justify-end flex-none shrink-0 flex-col gap-3 from-20% rounded-(--radius-exception) bg-linear-to-t from-(--primary)/90 to-transparent to-60% p-2 text-(--secondary)`}
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
        )}
      </DrawerTrigger>
      <DrawerContent
        style={styleVars as CSSProperties}
        className="rounded-t-3xl border-0 bg-(--bg) pt-1.5"
      >
        {/* drawer handle */}
        <div className="mx-auto mb-1.5 h-2 w-[100px] rounded-full bg-(--secondary)"></div>

        <div className="relative h-56 w-full xss:h-64 sm:h-[300px]">
          <Image
            className="rounded-3xl object-cover px-1.5 "
            src={`http://127.0.0.1:8000${image}`}
            alt={name}
            fill
          ></Image>
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
