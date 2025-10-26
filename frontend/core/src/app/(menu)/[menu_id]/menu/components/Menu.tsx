"use client";

import React from "react";

//components
import MenuHeader from "./MenuHeader";
import MenuItemsWrapper from "./Items/MenuItemsWrapper";
import ItemsCategory from "./ItemsCategory";
import CartBtn from "./CartBtn";

//libraries
import { cn } from "@/lib/utils";

//types
import { type Menu as MenuData } from "@/app/types/api/menu";
import { type MenuCategory } from "@/app/types/api/menu";
import { type MenuGlobalStyling } from "@/app/types/api/menu";
import { type MenuGlobalStylingUI, type MenuUI } from "@/app/types/ui/menu";

type MenuWrapper = {
  businessSlug?: string;
  categories: MenuCategory[];
  isPreview?: boolean;
};

type MenuProps = {
  globalStyling: MenuGlobalStyling;
  data: MenuData;
};

type MenuPreviewProps = {
  globalStyling: MenuGlobalStylingUI;
  data: MenuUI;
};

export default function Menu({
  data,
  businessSlug,
  globalStyling,
  categories,
  isPreview = false,
}: MenuWrapper & (MenuProps | MenuPreviewProps)) {
  return (
    <div className={cn("relative flex flex-col bg-(--bg) scrollbar-hide")}>
      <MenuHeader globalStyling={globalStyling} menuData={data}></MenuHeader>
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
