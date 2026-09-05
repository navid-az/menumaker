//components
import MenuLayout from "../../components/MenuLayout";

//types
import { type MenuGlobalStyling } from "@/app/types/api/menu";
import { type Menu as MenuData } from "@/app/types/api/menu";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// GET menu data
async function getMenuData(business_slug: string) {
  try {
    let res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${business_slug}/menu/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching menuData:", error);
  }
}

// GET menu global stylings
async function getGlobalStyling(business_slug: string) {
  try {
    let res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${business_slug}/menu/global-styling/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching menuData:", error);
  }
}

// GET menu categories
async function getMenuCategories(business_slug: string) {
  try {
    let res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${business_slug}/categories/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching menuData:", error);
  }
}

export default async function Page(props: {
  params: Promise<{ business_slug: string }>;
}) {
  const params = await props.params;

  const menuData: MenuData = await getMenuData(params.business_slug);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.business_slug
  );
  const categories = await getMenuCategories(params.business_slug);
  const businessSlug = params.business_slug;

  return (
    <MenuLayout
      menuData={menuData}
      globalStyling={globalStyling}
      categories={categories}
      businessSlug={businessSlug}
    ></MenuLayout>
  );
}
