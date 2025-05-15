//components
import { Button } from "@/components/ui/button";
import MenuItemsWrapper from "./components/Items/MenuItemsWrapper";
import ItemsCategory from "./components/ItemsCategory";
import CartBtn from "./components/CartBtn";

//types
import { type AnimationVariantType } from "@/components/global/InteractiveWrapper";
export type MenuGlobalStyling = {
  id: number;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
  bg_color: string;
  unit_display_type: "comp" | "simp" | "engL" | "perL";
  border_radius: "sm" | "md" | "lg" | "full";
  click_animation_enabled: boolean;
  click_animation_type: AnimationVariantType[];
  updated: string;
  created: string;
  menu: number;
};

//SVGs
import { AlignLeft, Filter, Search, ShoppingBag } from "lucide-react";

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

// GET menu categories
export async function getMenuCategories(menu_id: string) {
  try {
    let res = await fetch(
      `http://127.0.0.1:8000/business/${menu_id}/categories/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching data:", error);
  }
}

export default async function Page(props: {
  params: Promise<{ menu_id: string }>;
}) {
  const params = await props.params;
  const globalStyling = await getGlobalStyling(params.menu_id);
  const categories = await getMenuCategories(params.menu_id);

  return (
    <div className="relative flex flex-col bg-white">
      <section className="flex w-full flex-col gap-4 px-4 pt-4">
        <section className="flex items-center justify-between">
          <Button
            className="flex w-max items-center justify-between gap-2 rounded-full bg-white px-4"
            style={{
              color: globalStyling.primary_color,
              backgroundColor: globalStyling.secondary_color,
            }}
          >
            <ShoppingBag className="h-5 w-5"></ShoppingBag>
            <p className="mt-1 text-lg">2</p>
          </Button>
          <AlignLeft
            className="ml-2"
            style={{
              color: globalStyling.primary_color,
            }}
          ></AlignLeft>
        </section>
        <div className="flex gap-2">
          <div
            className="flex w-full items-center rounded-full px-3 py-2.5"
            style={{
              color: globalStyling.primary_color,
              backgroundColor: globalStyling.secondary_color,
            }}
          >
            <Search className="ml-1.5 h-5 w-5 opacity-80"></Search>
            <p className="text-sm opacity-80">جستجو</p>
          </div>
          <Button
            size="icon"
            className="flex-none rounded-full"
            style={{
              color: globalStyling.primary_color,
              backgroundColor: globalStyling.secondary_color,
            }}
          >
            <Filter className="h-5 w-5"></Filter>
          </Button>
        </div>
      </section>
      <ItemsCategory params={params}></ItemsCategory>
      <MenuItemsWrapper
        categories={categories}
        params={params}
        globalStyling={globalStyling}
      ></MenuItemsWrapper>
      <CartBtn categories={categories} globalStyling={globalStyling}></CartBtn>
    </div>
  );
}
