//components
import Menu from "./components/Menu";
import MenuItemsWrapper from "./components/Items/MenuItemsWrapper";
import ItemsCategory from "./components/ItemsCategory";
import CartBtn from "./components/CartBtn";
import MenuHeader from "./components/MenuHeader";

//types
import { type MenuGlobalStyling } from "@/app/types/api/menu";
import { type Menu as MenuData } from "@/app/types/api/menu";

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

  const menuData: MenuData = await getMenuData(params.menu_id);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.menu_id
  );
  const categories = await getMenuCategories(params.menu_id);
  const businessSlug = params.menu_id;

  return (
    <div className="relative flex flex-col bg-(--bg) scrollbar-hide">
      <MenuHeader
        globalStyling={globalStyling}
        menuData={menuData}
      ></MenuHeader>
      <ItemsCategory
        categories={categories}
        globalStyling={globalStyling}
      ></ItemsCategory>
      <MenuItemsWrapper
        categories={categories}
        globalStyling={globalStyling}
      ></MenuItemsWrapper>
      <CartBtn
        businessSlug={businessSlug}
        categories={categories}
        globalStyling={globalStyling}
      ></CartBtn>
    </div>
  );
}
