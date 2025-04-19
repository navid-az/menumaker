//components
import CategoryBtn from "./CategoryBtn";

//types
import { type MenuGlobalStyling } from "../page";
import { type MenuItemType } from "./Items/MenuItem";
export type CategoryType = {
  id: number;
  name: string;
  icon: { name: string; image: string };
  is_active: boolean;
  items: MenuItemType[];
};
type ItemsCategoryType = {
  params: { menu_id: string };
  type?: "vertical" | "horizontal";
  variant?: "minimal" | "classic";
  isSticky?: boolean;
  hasBackGround?: boolean;
  allowAnimation?: boolean;
};

// GET menu categories
export async function getCategories(menu_id: string) {
  try {
    let res = await fetch(
      `http://127.0.0.1:8000/business/${menu_id}/categories`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error", error);
  }
}

// GET menu global stylings
export async function getGlobalStyling(menu_id: string) {
  try {
    let res = await fetch(
      `http://127.0.0.1:8000/menu/${menu_id}/global-styling/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching data:", error);
  }
}

export default async function ItemsCategory({
  params,
  type = "horizontal",
  variant = "minimal",
  isSticky = true,
  hasBackGround = false,
  allowAnimation = true,
}: ItemsCategoryType) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const categories = await getCategories(params.menu_id);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.menu_id
  );

  return (
    <div
      className={`hide-scrollbar avoid-stretch backdrop-blur-lg ${
        isSticky && "sticky"
      } top-0 z-50 flex overflow-y-auto ${
        hasBackGround && "bg-primary"
      } p-2 transition-all ${
        type == "horizontal"
          ? "w-full flex-row gap-2"
          : "flex-color h-screen w-2/12 flex-col gap-4"
      }`}
    >
      {categories.map(
        (category: CategoryType) =>
          category.is_active &&
          category["items"].length > 0 && (
            <CategoryBtn
              key={category.id}
              id={category.id.toString()}
              name={category.name}
              parentType={type}
              icon={category.icon.image}
              primary_color={globalStyling.primary_color}
              secondary_color={globalStyling.secondary_color}
              animations={globalStyling.click_animation}
            ></CategoryBtn>
          )
      )}
    </div>
  );
}
