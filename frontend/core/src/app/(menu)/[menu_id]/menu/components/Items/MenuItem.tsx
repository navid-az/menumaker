"use client";

import { useRef } from "react";

//components
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PriceTag from "../PriceTag";
import AddItemBtn from "../AddItemBtn";

//hooks
import useConditionalAnimation from "@/app/hooks/useConditionalAnimation";

//SVGs
import { Heart } from "lucide-react";

//data(instance)
const itemData = {
  primary_color: "#431407",
  secondary_color: "#fdba74",
  animation: ["ripple", "tactile"],
};

//types
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
};

export function MenuItem({
  id,
  name,
  description,
  image,
  price,
  is_active = true,
  is_available = true,
}: // isFeatured = false,
MenuItemType) {
  const itemRef = useRef(null);

  //animations
  useConditionalAnimation(itemRef, [
    { animation: "ripple", config: { duration: 600, size: 200 } },
    { animation: "tactile", config: { duration: 0.1, scale: 0.9 } },
  ]);

  return (
    <Drawer setBackgroundColorOnScale={false}>
      <DrawerTrigger asChild>
        <div
          ref={itemRef}
          className="relative h-52 w-full xs:h-72 x:h-72 sm:h-[400px]"
        >
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
          <AddItemBtn
            size="lg"
            itemId={id.toString()}
            primaryColor={itemData.primary_color}
            secondaryColor={itemData.secondary_color}
          ></AddItemBtn>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
