//components
import CategoryBtn from "./CategoryBtn";

//types
import { type MenuCategory } from "@/app/types/api/menu";
import { type MenuItem } from "@/app/types/api/menu";
import { type MenuGlobalStyling } from "@/app/types/api/menu";
export type CategoryType = {
  id: number;
  name: string;
  icon: { name: string; image: string };
  is_active: boolean;
  items: MenuItem[];
};
type ItemsCategoryType = {
  categories: MenuCategory[];
  type?: "vertical" | "horizontal";
  variant?: "minimal" | "classic";
  isSticky?: boolean;
  hasBackGround?: boolean;
  allowAnimation?: boolean;
  globalStyling: MenuGlobalStyling;
};

export default function ItemsCategory({
  categories,
  type = "horizontal",
  variant = "minimal",
  isSticky = true,
  hasBackGround = false,
  allowAnimation = true,
  globalStyling,
}: ItemsCategoryType) {
  return (
    <div
      className={`hide-scrollbar avoid-stretch ${
        isSticky && "sticky"
      } top-0 z-50 flex overflow-y-auto ${
        hasBackGround && "bg-primary"
      } p-4 transition-all duration-300 ${
        type == "horizontal"
          ? "w-full flex-row gap-2"
          : "flex-color h-screen w-2/12 flex-col gap-4"
      }`}
    >
      {categories.map(
        (category: MenuCategory) =>
          category.is_active &&
          category["items"].length > 0 && (
            <CategoryBtn
              key={category.id}
              id={category.id.toString()}
              name={category.name}
              parentType={type}
              icon={category.icon}
              globalStyling={globalStyling}
            ></CategoryBtn>
          )
      )}
    </div>
  );
}
