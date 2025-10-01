//components
import MenuItemsWrapper from "./components/Items/MenuItemsWrapper";
import ItemsCategory from "./components/ItemsCategory";
import CartBtn from "./components/CartBtn";
import MenuHeader from "./components/MenuHeader";

//types
import { type AnimationVariantType } from "@/components/global/InteractiveWrapper";
export type Menu = {
  id: number;
  business: number;
  show_social_links: boolean;
  show_phone_numbers: boolean;
  show_branches: boolean;
  items_page_layout: string;
  categories_display_type: string;
  call_waiter_enabled: boolean;
  searchbar_enabled: boolean;
  home_title: string;
  home_subtitle: string;
  primary_image: string;
  secondary_image: string;
  tertiary_image: string;
};
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

// GET menu data
export async function getMenuData(menu_id: string) {
  try {
    let res = await fetch(`http://127.0.0.1:8000/menu/${menu_id}/`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching data:", error);
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

  const menuData: Menu = await getMenuData(params.menu_id);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.menu_id
  );
  const categories = await getMenuCategories(params.menu_id);
  const businessSlug = params.menu_id;

  return (
    <div className="relative flex flex-col bg-(--bg)">
      <MenuHeader menuData={menuData}></MenuHeader>
      <ItemsCategory params={params}></ItemsCategory>
      <MenuItemsWrapper
        categories={categories}
        params={params}
        globalStyling={globalStyling}
      ></MenuItemsWrapper>
      <CartBtn
        type="compact"
        businessSlug={businessSlug}
        categories={categories}
        globalStyling={globalStyling}
      ></CartBtn>
    </div>
  );
}
