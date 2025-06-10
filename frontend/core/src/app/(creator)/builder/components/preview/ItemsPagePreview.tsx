import React from "react";

//components
import ItemsCategoryPreview from "./ItemsCategoryPreview";
import MenuItemsWrapperPreview from "./MenuItemsWrapperPreview";

export default function ItemsPagePreview({
  colors,
  globalBorderRadius,
}: {
  colors: string[];
  globalBorderRadius: "full" | "lg" | "md" | "sm";
}) {
  return (
    <div className="pb-6 pt-[46px]">
      <ItemsCategoryPreview
        colors={colors}
        globalBorderRadius={globalBorderRadius}
      ></ItemsCategoryPreview>
      <MenuItemsWrapperPreview
        colors={colors}
        globalBorderRadius={globalBorderRadius}
      ></MenuItemsWrapperPreview>
    </div>
  );
}
