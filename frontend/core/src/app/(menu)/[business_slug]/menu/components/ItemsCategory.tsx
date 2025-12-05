//components
import CategoryBtn from "./CategoryBtn";

//types
import { type MenuCategory } from "@/app/types/api/menu";
import { type MenuItem } from "@/app/types/api/menu";
import { type MenuGlobalStylingUI } from "@/app/types/ui/menu";

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
  globalStyling: MenuGlobalStylingUI;
};

export default function ItemsCategory({
  categories,
  type = "vertical",
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
      }transition-all duration-300 ${
        type == "horizontal"
          ? "w-full flex-row gap-2 p-4 "
          : "flex-color w-max shrink-0 flex-col gap-4 px-4 sticky top-4 h-screen pt-4"
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
