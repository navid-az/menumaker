//components
import { MenuEditor } from "../components/MenuEditor";

//types
import { type Business } from "@/app/types/api/business";
import { type MenuGlobalStyling } from "@/app/types/api/menu";
import { type Menu as MenuData } from "@/app/types/api/menu";
import { type AssetGroupType } from "@/components/global/AssetPicker";

//functions
import { getAssetGroups } from "@/lib/assets/getAssetGroups";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// GET business data
async function getBusinessData(business_slug: string) {
  try {
    let res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${business_slug}/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching business data:", error);
  }
}

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

export default async function page(props: {
  params: Promise<{ business_slug: string }>;
}) {
  const params = await props.params;

  const businessData: Business = await getBusinessData(params.business_slug);
  const menuData: MenuData = await getMenuData(params.business_slug);

  const globalStylingData: MenuGlobalStyling = await getGlobalStyling(
    params.business_slug
  );
  const assetGroups: AssetGroupType[] = await getAssetGroups('icon');

  return (
    <div className="h-screen overflow-hidden">
      <MenuEditor
        businessData={businessData}
        menuData={menuData}
        globalStylingData={globalStylingData}
        assetGroups={assetGroups}
      ></MenuEditor>
    </div>
  );
}
