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
import {
  AlignLeft,
  ConciergeBell,
  Filter,
  Search,
  ShoppingBag,
} from "lucide-react";

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
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.menu_id
  );
  const categories = await getMenuCategories(params.menu_id);

  const styleVars = {
    "--primary": globalStyling.primary_color,
    "--secondary": globalStyling.secondary_color,
    "--tertiary": globalStyling.tertiary_color,
    "--bg": globalStyling.bg_color,
    "--radius-base":
      globalStyling.border_radius === "sm"
        ? "4px"
        : globalStyling.border_radius === "md"
        ? "6px"
        : globalStyling.border_radius === "lg"
        ? "8px"
        : "9999px", // full
    "--radius-inner":
      globalStyling.border_radius === "sm"
        ? "2px"
        : globalStyling.border_radius === "md"
        ? "4px"
        : globalStyling.border_radius === "lg"
        ? "6px"
        : "9999px", // full,
    "--radius-exception":
      globalStyling.border_radius === "sm"
        ? "2px"
        : globalStyling.border_radius === "md"
        ? "4px"
        : globalStyling.border_radius === "lg"
        ? "6px"
        : "24px", // full,
  };

  return (
    <div
      style={styleVars as React.CSSProperties}
      className="relative flex flex-col bg-white"
    >
      <section className="flex w-full flex-col gap-4 rounded px-4 pt-4">
        <section className="flex items-center justify-between">
          <Button className="flex w-max items-center justify-between gap-2 rounded-[var(--radius-base)] bg-[color:var(--secondary)] px-4 text-[color:var(--primary)]">
            <ShoppingBag className="h-5 w-5"></ShoppingBag>
            <p className="mt-1 text-lg">2</p>
          </Button>
          <AlignLeft className="ml-2 text-[color:var(--primary)]"></AlignLeft>
        </section>
        <div className="flex gap-2">
          <div className="flex w-full items-center rounded-[var(--radius-base)] bg-[color:var(--secondary)] px-3 py-2.5 text-[color:var(--primary)]">
            <Search className="ml-1.5 h-5 w-5 opacity-80"></Search>
            <p className="text-sm opacity-80">جستجو</p>
          </div>
          <Button
            size="icon"
            className="flex-none rounded-[var(--radius-base)] bg-[color:var(--secondary)] text-[color:var(--primary)]"
          >
            <Filter className="h-5 w-5"></Filter>
          </Button>
        </div>
        <Button className="w-max flex-none rounded-full bg-orange-300 text-orange-800">
          <ConciergeBell className="ml-2"></ConciergeBell>
          <p>سالن دار</p>
        </Button>
      </section>
      <ItemsCategory params={params}></ItemsCategory>
      <MenuItemsWrapper
        categories={categories}
        params={params}
        globalStyling={globalStyling}
        styleVars={styleVars as React.CSSProperties}
      ></MenuItemsWrapper>
      <CartBtn categories={categories} globalStyling={globalStyling}></CartBtn>
    </div>
  );
}
