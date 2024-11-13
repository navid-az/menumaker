"use client";

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
import { Button } from "@/components/ui/button";
import InteractiveWrapper, {
  type AnimationVariantType,
} from "@/components/global/InteractiveWrapper";
import PriceTag from "../PriceTag";
import AddToCartBtn from "../AddToCartBtn";

//hooks
import { useMenuItemDrawer } from "@/lib/stores";

//SVGs
import { Heart } from "lucide-react";
import mapAnimationsToConfigs from "@/lib/mapAnimationsToConfigs";

//data(instance)
const itemData = {
  primary_color: "#431407",
  secondary_color: "#fdba74",
};

//types
import { type AnimationConfigType } from "@/components/global/InteractiveWrapper";
export type MenuItemType = {
  id: number;
  menu?: string;
  category?: string;
  name: string;
  description: string;
  image: string;
  price: number;
  is_available?: boolean;
  is_active?: boolean;
  isFeatured?: boolean;
  animations?: AnimationVariantType[];
};

export function MenuItem({
  id,
  name,
  description,
  image,
  price,
  is_active = true,
  is_available = true,
  isFeatured = false,
  animations = [],
}: MenuItemType) {
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
    animations
  );

  return (
    <Drawer setBackgroundColorOnScale={false} onOpenChange={handleDrawer}>
      <DrawerTrigger asChild>
        {is_available ? (
          <InteractiveWrapper asChild animations={animationConfigs}>
            <div className="relative col-span-2 h-80 x:h-72 sm:h-[400px]">
              <div className="absolute h-full w-full rounded-3xl bg-gradient-to-t from-zinc-900 to-70%"></div>
              <Button
                onClick={(e) => e.stopPropagation()}
                className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-3xl bg-inherit p-0 backdrop-blur-lg"
              >
                <Heart className="text-orange-300"></Heart>
              </Button>
              <div
                style={{ color: itemData.secondary_color }}
                className={`absolute bottom-0 right-0 z-20 flex w-full flex-col justify-between rounded-b-3xl p-3 backdrop-blur-[1px] xss:p-4`}
              >
                <div className="flex w-full justify-between gap-1">
                  <p className="text-xl font-bold">{name}</p>
                  <PriceTag price={price} unitDisplayType="compact"></PriceTag>
                </div>
                <p className="line-clamp-1 w-10/12 text-ellipsis text-xs font-light xss:line-clamp-2 xss:w-full xss:text-sm">
                  {description}
                </p>
              </div>
              <Image
                className="absolute -z-10 rounded-3xl object-cover"
                src={`http://127.0.0.1:8000/${image}`}
                alt={name}
                fill
              ></Image>
            </div>
          </InteractiveWrapper>
        ) : (
          <InteractiveWrapper asChild animations={animationConfigs}>
            <div className="relative col-span-2 flex h-[300px] flex-none flex-col xss:col-span-1">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-t from-orange-200 from-25% to-60%"></div>
              <div className="relative flex w-full basis-9/12 justify-end p-2">
                <Button
                  size="icon"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute z-20 h-8 w-8 rounded-full bg-inherit backdrop-blur-lg"
                >
                  <Heart className="h-4 w-4 text-orange-300"></Heart>
                </Button>
                <Image
                  className="absolute -z-20 rounded-t-2xl object-cover"
                  src={`http://127.0.0.1:8000/${image}`}
                  alt={name}
                  fill
                ></Image>
              </div>
              <div
                style={{ color: itemData.primary_color }}
                className={`absolute bottom-0 flex w-full flex-none shrink-0 basis-5/12 flex-col justify-between gap-3 rounded-b-3xl p-2`}
              >
                <div className="space-y-0.5">
                  <p className="text-lg font-semibold">{name}</p>
                  <p className="line-clamp-1 w-10/12 text-ellipsis text-xs font-light xss:w-full xss:text-sm">
                    {description}
                  </p>
                </div>
                <AddToCartBtn
                  size="sm"
                  itemId={id}
                  primaryColor={itemData.secondary_color}
                  secondaryColor={itemData.primary_color}
                  animations={animations}
                ></AddToCartBtn>
              </div>
            </div>
          </InteractiveWrapper>
        )}
      </DrawerTrigger>
      <DrawerContent className="rounded-t-3xl border-0 pt-1.5">
        {/* drawer handle */}
        <div
          className="mx-auto mb-1.5 h-2 w-[100px] rounded-full"
          style={{ background: itemData.secondary_color }}
        ></div>

        <div className="relative h-56 w-full xss:h-64 sm:h-[300px]">
          <Image
            className="rounded-3xl object-cover px-1.5"
            src={`http://127.0.0.1:8000/${image}`}
            alt={name}
            fill
          ></Image>
        </div>
        <DrawerHeader className="flex flex-col text-right">
          <div
            className="flex w-full items-center justify-between"
            style={{ color: itemData.primary_color }}
          >
            <DrawerTitle className="text-xl xss:text-2xl">{name}</DrawerTitle>
            <PriceTag
              size="lg"
              price={price}
              unitDisplayType="compact"
            ></PriceTag>
          </div>
          <DrawerDescription
            className="text-right font-light ltr:text-left"
            style={{ color: itemData.primary_color }}
          >
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <AddToCartBtn
            size="lg"
            itemId={id}
            primaryColor={itemData.primary_color}
            secondaryColor={itemData.secondary_color}
            animations={animations}
          ></AddToCartBtn>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
