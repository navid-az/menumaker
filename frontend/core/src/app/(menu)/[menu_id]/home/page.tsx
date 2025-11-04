//components
import HomeLayout from "./components/HomeLayout";

//types
import { type MenuGlobalStyling, type Menu } from "@/app/types/api/menu";

// GET menu data
export async function getMenuData(menu_id: string) {
  try {
    let res = await fetch(`http://127.0.0.1:8000/menu/${menu_id}`);
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

export default async function page(props: {
  params: Promise<{ menu_id: string }>;
}) {
  const params = await props.params;

  const menuData: Menu = await getMenuData(params.menu_id);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.menu_id
  );

  return (
    <HomeLayout
      menuData={menuData}
      businessSlug={params.menu_id}
      globalStyling={globalStyling}
    ></HomeLayout>
  );
}
