"use client";

import { useRef, useState } from "react";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PriceTag from "../PriceTag";

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
  name,
  description,
  image,
  price,
  is_active = true,
  is_available = true,
}: // isFeatured = false,
MenuItemType) {
  const itemRef = useRef(null);

  useConditionalAnimation(itemRef, [
    { animation: "ripple", config: { duration: 600, size: 200 } },
    { animation: "tactile", config: { duration: 0.1, scale: 0.9 } },
  ]);

  return (
    <div
      ref={itemRef}
      // onClick={handleAnimation}
      className="relative h-52 w-full rounded-3xl xs:h-64 x:h-72"
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
        className={`absolute bottom-0 right-0 z-20 flex w-full items-center justify-between gap-1 rounded-b-3xl p-4 backdrop-blur-[1px]`}
      >
        <div className="flex w-8/12 flex-col gap-1">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-sm font-light">{description}</p>
        </div>
        <PriceTag price={price} unitDisplayType="compact"></PriceTag>
      </div>
      <Image
        className="absolute -z-10 rounded-3xl object-cover"
        src={`http://127.0.0.1:8000/${image}`}
        alt={name}
        fill
      ></Image>
    </div>
  );
}
