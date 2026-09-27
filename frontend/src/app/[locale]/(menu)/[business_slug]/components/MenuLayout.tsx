"use client";

import React from "react";

//components
import MenuHeader from "../(public-menu)/menu/components/MenuHeader";
import ItemsCategory from "../(public-menu)/menu/components/ItemsCategory";
import MenuItemsWrapper from "../(public-menu)/menu/components/Items/MenuItemsWrapper";
import CartBtn from "../(public-menu)/menu/components/CartBtn";

//libraries
import { cn } from "@/lib/utils";

//types
import { type MenuGlobalStylingUI, type MenuUI } from "@/app/types/ui/menu";
import { type MenuItem, type MenuCategory } from "@/app/types/api/menu";
type MenuLayoutProps = {
  menuData: MenuUI;
  globalStyling: MenuGlobalStylingUI;
  items?: MenuItem[]
  categories: MenuCategory[];
  businessSlug?: string;
};

export default function MenuLayout({
  menuData,
  globalStyling,
  items,
  categories,
  businessSlug,
}: MenuLayoutProps) {

  // When items are provided, render only active categories with their matching items.
  // When items are not provided, use the categories as-is.
  const menuCategories = items ? categories
    .filter((category) => category.is_active)
    .map((category) => ({
      ...category,
      items: items.filter(
        (item) => item.category === category.id
      ),
    }))
    .filter((category) => category.items.length > 0)
    : categories

  return (
    <div className={cn("relative bg-(--bg) flex flex-col scrollbar-hide")}>
      <MenuHeader
        businessSlug={businessSlug}
        globalStyling={globalStyling}
        menuData={menuData}
      ></MenuHeader>
      {menuData.items_page_layout === "horizontal" ? (
        <div>
          <ItemsCategory
            categories={menuCategories}
            globalStyling={globalStyling}
            type={menuData.items_page_layout}
          ></ItemsCategory>
          <MenuItemsWrapper
            categories={menuCategories}
            menuData={menuData}
            globalStyling={globalStyling}
          ></MenuItemsWrapper>
        </div>
      ) : (
        <div className="flex rtl-flex-row-reverse">
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
        </div>
      )}
      <CartBtn
        type={menuData.cart_btn_display_type}
        businessSlug={businessSlug}
        categories={categories}
        globalStyling={globalStyling}
      ></CartBtn>
    </div>
  );
}
