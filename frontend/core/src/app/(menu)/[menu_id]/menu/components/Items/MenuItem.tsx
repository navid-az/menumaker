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

  return (
    <Drawer setBackgroundColorOnScale={false} onOpenChange={handleDrawer}>
      <DrawerTrigger asChild>
        {isFeatured ? (
          <div className="relative col-span-2 flex h-[300px] flex-none flex-col">
            <div className="relative flex h-full w-full">
              <Image
                className="rounded-b-3xl rounded-t-2xl object-cover"
                src={`http://127.0.0.1:8000/${image}`}
                alt={name}
                fill
              ></Image>
            </div>
            <div
              style={{
                color: globalStyling.primary_color,
                backgroundColor: globalStyling.secondary_color,
              }}
              className={`absolute bottom-0 flex w-full flex-none shrink-0 basis-5/12 flex-col justify-between gap-3 rounded-b-2xl p-3`}
            >
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{name}</p>
                <p className="text-sm font-normal">{description}</p>
              </div>
              <div className="flex justify-between">
                <PriceTag
                  unitDisplayType="compact"
                  removeZeroes
                  price={price}
                ></PriceTag>
                <AddToCartBtn
                  itemId={id}
                  globalStyling={globalStyling}
                ></AddToCartBtn>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative flex h-[300px] flex-none flex-col xss:col-span-1">
            <div className="relative flex h-full w-full">
              <Image
                className="rounded-b-3xl rounded-t-2xl object-cover"
                src={`http://127.0.0.1:8000/${image}`}
                alt={name}
                fill
              ></Image>
            </div>
            <div
              style={{
                color: globalStyling.primary_color,
                backgroundColor: globalStyling.secondary_color,
              }}
              className={`absolute bottom-0 flex w-full flex-none shrink-0 basis-5/12 flex-col justify-between gap-3 rounded-b-2xl p-2`}
            >
              <div className="space-y-0.5">
                <p className="text-lg font-semibold">{name}</p>
                <PriceTag size="sm" price={price}></PriceTag>
              </div>
              <AddToCartBtn
                itemId={id}
                globalStyling={globalStyling}
              ></AddToCartBtn>
            </div>
          </div>
        )}
      </DrawerTrigger>
      <DrawerContent className="rounded-t-3xl border-0 bg-white pt-1.5">
        {/* drawer handle */}
        <div
          className="mx-auto mb-1.5 h-2 w-[100px] rounded-full"
          style={{ background: globalStyling.primary_color }}
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
            style={{ color: globalStyling.primary_color }}
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
            style={{ color: globalStyling.primary_color }}
          >
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
