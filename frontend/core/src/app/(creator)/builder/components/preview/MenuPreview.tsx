"use client";

import React from "react";

//components
import Image from "next/image";
import ItemsCategoryPreview from "./ItemsCategoryPreview";

//libraries
import { useFormContext } from "react-hook-form";
import MenuItemsWrapperPreview from "./MenuItemsWrapperPreview";

export default function MenuPreview() {
  const { watch } = useFormContext();
  const colors = watch("global_styling.color_palette");
  const globalBorderRadius = watch("global_styling.border_radius");

  return (
    <>
      {!colors ? (
        <div className="relative flex h-[932px] w-[424px] scale-[70%] flex-col rounded-2xl">
          <Image
            src="/svgs/iphone.svg"
            fill
            alt="menu prototype"
            className="pointer-events-none z-50"
          ></Image>
        </div>
      ) : (
        <div className="relative flex h-[932px] w-[424px] scale-[80%] flex-col rounded-2xl">
          <Image
            src="/images/form-icons/prototype.svg"
            alt="menu prototype"
            fill
            className="pointer-events-none z-50"
          ></Image>
          <section className="hide-scrollbar relative mx-[36px] my-[85px] h-full overflow-y-scroll rounded-[30px] bg-gray-200 pb-6 pt-12">
            <ItemsCategoryPreview
              colors={colors}
              globalBorderRadius={globalBorderRadius}
            ></ItemsCategoryPreview>
            <MenuItemsWrapperPreview
              colors={colors}
              globalBorderRadius={globalBorderRadius}
            ></MenuItemsWrapperPreview>
          </section>
        </div>
      )}
    </>
  );
}
