"use client";

import React from "react";

//components
import MenuHeader from "../menu/components/MenuHeader";
import ItemsCategory from "../menu/components/ItemsCategory";
import MenuItemsWrapper from "../menu/components/Items/MenuItemsWrapper";
import CartBtn from "../menu/components/CartBtn";

//libraries
import { cn } from "@/lib/utils";

//types
import { type MenuGlobalStylingUI, type MenuUI } from "@/app/types/ui/menu";
import { type MenuCategory } from "@/app/types/api/menu";
type MenuLayoutProps = {
  menuData: MenuUI;
  globalStyling: MenuGlobalStylingUI;
  categories: MenuCategory[];
  businessSlug?: string;
};

export default function MenuLayout({
  menuData,
  globalStyling,
  categories,
  businessSlug,
}: MenuLayoutProps) {
  return (
    <div className={cn("relative bg-(--bg) flex flex-col scrollbar-hide")}>
      <MenuHeader
        businessSlug={businessSlug}
        globalStyling={globalStyling}
        menuData={menuData}
      ></MenuHeader>
      {menuData.items_page_layout === "horizontal" ? (
        <>
          <ItemsCategory
            categories={categories}
            globalStyling={globalStyling}
            type={menuData.items_page_layout}
          ></ItemsCategory>
          <MenuItemsWrapper
            categories={categories}
            menuData={menuData}
            globalStyling={globalStyling}
          ></MenuItemsWrapper>
        </>
      ) : (
        <div className="flex">
          <MenuItemsWrapper
            categories={categories}
            menuData={menuData}
            globalStyling={globalStyling}
          ></MenuItemsWrapper>
          <ItemsCategory
            categories={categories}
            globalStyling={globalStyling}
            type={menuData.items_page_layout}
          ></ItemsCategory>
        </div>
      )}
      <CartBtn
        businessSlug={businessSlug}
        categories={categories}
        globalStyling={globalStyling}
      ></CartBtn>
    </div>
  );
}
