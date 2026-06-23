//components
import HomeLayout from "./components/HomeLayout";

//types
import { type MenuGlobalStyling, type Menu } from "@/app/types/api/menu";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

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
    console.error("error fetching data:", error);
  }
}

// GET menu global stylings
async function getGlobalStyling(business_slug: string) {
  try {
    let res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${business_slug}/menu/global-styling`
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
  params: Promise<{ business_slug: string }>;
}) {
  const params = await props.params;

  const menuData: Menu = await getMenuData(params.business_slug);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.business_slug
  );

  return (
    <HomeLayout
      menuData={menuData}
      businessSlug={params.business_slug}
      globalStyling={globalStyling}
    ></HomeLayout>
  );
}
