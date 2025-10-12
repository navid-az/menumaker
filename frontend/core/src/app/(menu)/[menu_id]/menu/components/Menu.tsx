"use client";

import React, { useRef } from "react";

//components
import MenuHeader from "./MenuHeader";
import MenuItemsWrapper, { CategoriesType } from "./Items/MenuItemsWrapper";
import ItemsCategory from "./ItemsCategory";
import CartBtn from "./CartBtn";

//types
import { type Menu, type MenuGlobalStyling } from "../page";
import { cn } from "@/lib/utils";
type MenuWrapper = {
  data: Menu;
  businessSlug: string;
  globalStyling: MenuGlobalStyling;
  categories: CategoriesType[];
  isPreview?: boolean;
};

export default function Menu({
  data,
  businessSlug,
  globalStyling,
  categories,
  isPreview = false,
}: MenuWrapper) {
  return (
    <div className={cn("relative flex flex-col bg-(--bg) scrollbar-hide")}>
      <MenuHeader menuData={data}></MenuHeader>
      <ItemsCategory
        categories={categories}
        globalStyling={globalStyling}
      ></ItemsCategory>
      <MenuItemsWrapper
        categories={categories}
        globalStyling={globalStyling}
      ></MenuItemsWrapper>
      <CartBtn
        businessSlug={businessSlug}
        categories={categories}
        globalStyling={globalStyling}
      ></CartBtn>
    </div>
  );
}
