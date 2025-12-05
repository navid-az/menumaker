"use client";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PriceTag from "@/app/(menu)/[business_slug]/menu/components/PriceTag";
import AddToCartBtn from "@/app/(menu)/[business_slug]/menu/components/AddToCartBtn";

//SVGs
import { Heart } from "lucide-react";

//types
import { AnimationVariantType } from "@/components/global/InteractiveWrapper";
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
  colors: string[];
  globalBorderRadius: "full" | "lg" | "md" | "sm";
};

export function MenuItemPreview({
  id,
  name,
  description,
  image,
  price,
  is_active = true,
  is_available = true,
  isFeatured = false,
  animations = [],
  colors,
  globalBorderRadius,
}: MenuItemType) {
  if (is_available) {
    return (
      <div className="relative col-span-2 h-[250px]">
        {/* <div className="absolute z-20 h-full w-full rounded-3xl bg-linear-to-t from-purple-900 to-70%"></div>
        <Button
          onClick={(e) => e.stopPropagation()}
          className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-3xl bg-inherit p-0 backdrop-blur-lg"
        >
          <Heart className="text-orange-300"></Heart>
        </Button> */}
        <div
          style={{
            color: colors ? colors[1] : "red",
            backgroundColor: colors ? colors[0] : "red",
            borderBottomLeftRadius:
              globalBorderRadius === "full"
                ? "20px"
                : globalBorderRadius === "lg"
                  ? "14px"
                  : globalBorderRadius === "md"
                    ? "7px"
                    : "3px",
            borderBottomRightRadius:
              globalBorderRadius === "full"
                ? "20px"
                : globalBorderRadius === "lg"
                  ? "14px"
                  : globalBorderRadius === "md"
                    ? "7px"
                    : "3px",
          }}
          className={`absolute bottom-0 right-0 z-20 flex w-full flex-col justify-between gap-2 rounded-b-3xl p-4 transition-all duration-300`}
        >
          <div className="flex w-full justify-between gap-1">
            <p className="text-xl font-bold">{name}</p>
            <PriceTag price={price} unitDisplayType="compact"></PriceTag>
          </div>
          <p className="text-xs font-normal">{description}</p>
        </div>
        <Image
          className="absolute rounded-3xl object-cover"
          src={`http://127.0.0.1:8000${image}`}
          alt={name}
          fill
        ></Image>
      </div>
    );
  } else
    return (
      <div className="col-span-1 flex h-60 flex-none flex-col rounded-3xl border">
        {/* <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-t from-orange-200 from-25% to-60%"></div> */}
        <div className="relative flex w-full basis-7/12 justify-end p-2">
          <Button
            size="icon"
            onClick={(e) => e.stopPropagation()}
            className="z-10 h-8 w-8 bg-inherit backdrop-blur-lg"
          >
            <Heart
              className="h-4 w-4"
              style={{ color: colors ? colors[0] : "red" }}
            ></Heart>
          </Button>
          <Image
            className="object-cover transition-all duration-300"
            src={`http://127.0.0.1:8000${image}`}
            alt={name}
            fill
            style={{
              borderTopLeftRadius:
                globalBorderRadius === "full"
                  ? "20px"
                  : globalBorderRadius === "lg"
                    ? "14px"
                    : globalBorderRadius === "md"
                      ? "7px"
                      : "4px",
              borderTopRightRadius:
                globalBorderRadius === "full"
                  ? "20px"
                  : globalBorderRadius === "lg"
                    ? "14px"
                    : globalBorderRadius === "md"
                      ? "7px"
                      : "4px",
            }}
          ></Image>
        </div>
        <div
          style={{
            color: colors ? colors[1] : "red",
            backgroundColor: colors ? colors[0] : "red",
            borderBottomLeftRadius:
              globalBorderRadius === "full"
                ? "20px"
                : globalBorderRadius === "lg"
                  ? "14px"
                  : globalBorderRadius === "md"
                    ? "7px"
                    : "3px",
            borderBottomRightRadius:
              globalBorderRadius === "full"
                ? "20px"
                : globalBorderRadius === "lg"
                  ? "14px"
                  : globalBorderRadius === "md"
                    ? "7px"
                    : "3px",
          }}
          className={`flex w-full basis-5/12 flex-col justify-end gap-3 p-2 transition-all duration-300`}
        >
          <div className="space-y-0.5">
            <p className="text-sm font-bold">{name}</p>
            <p className="line-clamp-1 w-10/12 text-ellipsis text-xs font-light xss:w-full xss:text-sm">
              {description}
            </p>
          </div>
          <AddToCartBtn
            size="sm"
            itemId={id}
            primaryColor={colors ? colors[0] : "red"}
            secondaryColor={colors ? colors[1] : "red"}
            animations={animations}
            borderRadius={
              globalBorderRadius === "full" ? "default" : globalBorderRadius
            }
          ></AddToCartBtn>
        </div>
      </div>
    );
}
