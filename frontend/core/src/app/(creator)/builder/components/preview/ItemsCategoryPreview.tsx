"use client";

//components
import CategoryBtnPreview from "./CategoryBtnPreview";

export type CategoryType = {
  id: number;
  name: string;
  icon: { name: string; image: string };
  is_active: boolean;
  // items: MenuItemType[];
};
type ItemsCategoryType = {
  type?: "vertical" | "horizontal";
  variant?: "minimal" | "classic";
  isSticky?: boolean;
  hasBackGround?: boolean;
  allowAnimation?: boolean;
  colors: string[];
  globalBorderRadius: "full" | "lg" | "md" | "sm";
};

export default function ItemsCategoryPreview({
  type = "horizontal",
  variant = "minimal",
  isSticky = true,
  hasBackGround = false,
  allowAnimation = true,
  colors,
  globalBorderRadius,
}: ItemsCategoryType) {
  // mockup data
  const categoryData = [
    { name: "پیتزا", icon: "/media/iconPicker/icons/pizza_colored.svg" },
    { name: "برگر", icon: "/media/iconPicker/icons/burger.svg" },
    { name: "نوشیدنی های سرد", icon: "/media/iconPicker/icons/drink.svg" },
    { name: "نوشیدنی های گرم", icon: "/media/iconPicker/icons/tea.svg" },
  ];
  return (
    <div
      className={`hide-scrollbar avoid-stretch h-200px overflow-x-auto pb-4 backdrop-blur-lg ${
        isSticky && "sticky"
      } flex ${hasBackGround && "bg-primary"} p-2 transition-all ${
        type == "horizontal"
          ? "h-max w-full flex-row gap-2"
          : "flex-color h-full w-2/12 flex-col gap-4"
      }`}
    >
      {categoryData.map((category, index) => (
        <CategoryBtnPreview
          key={index}
          id={index.toString()}
          name={category.name}
          parentType={type}
          icon={category.icon}
          animations={["ripple", "tactile"]}
          colors={colors}
          globalBorderRadius={globalBorderRadius}
        ></CategoryBtnPreview>
      ))}
    </div>
  );
}
