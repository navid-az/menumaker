//components
import CartLayout from "./components/CartLayout";

//types
import { type MenuItem } from "@/app/types/api/menu";
import { type MenuGlobalStyling } from "@/app/types/api/menu";
export type ValidItemType = { item: MenuItem; count?: number };

// GET menu items
async function getItems(business_slug: string) {
  try {
    let res = await fetch(
      `http://127.0.0.1:8000/businesses/${business_slug}/items`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching data:", error);
  }
}

// GET menu global stylings
export async function getGlobalStyling(business_slug: string) {
  try {
    let res = await fetch(
      `http://127.0.0.1:8000/businesses/${business_slug}/menu/global-styling`
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
  params: Promise<{ business_slug: string }>;
}) {
  const params = await props.params;
  const data: MenuItem[] = await getItems(params.business_slug);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.business_slug
  );

  return (
    <CartLayout
      items={data}
      globalStyling={globalStyling}
      businessSlug={params.business_slug}
    ></CartLayout>
  );
}
