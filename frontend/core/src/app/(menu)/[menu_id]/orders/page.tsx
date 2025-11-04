//components
import CartLayout from "./components/CartLayout";

//types
import { type MenuItem } from "@/app/types/api/menu";
import { type MenuGlobalStyling } from "@/app/types/api/menu";
export type ValidItemType = { item: MenuItem; count?: number };

// GET menu items
async function getItems(menu_id: string) {
  try {
    let res = await fetch(`http://127.0.0.1:8000/business/${menu_id}/items`);
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

export default async function Page(props: {
  params: Promise<{ menu_id: string }>;
}) {
  const params = await props.params;
  const data: MenuItem[] = await getItems(params.menu_id);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.menu_id
  );

  return (
    <CartLayout
      items={data}
      globalStyling={globalStyling}
      businessSlug={params.menu_id}
    ></CartLayout>
  );
}
