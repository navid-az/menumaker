//components
import { MenuEditor } from "../components/MenuEditor";

//types
import { type Business } from "@/app/types/api/business";
import { type MenuGlobalStyling } from "@/app/types/api/menu";
import { type Menu as MenuData } from "@/app/types/api/menu";
import { type AssetGroupType } from "@/components/global/AssetPicker";

// GET business data
export async function getBusinessData(business_slug: string) {
  try {
    let res = await fetch(`http://127.0.0.1:8000/businesses/${business_slug}/`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching business data:", error);
  }
}

// GET menu data
export async function getMenuData(business_slug: string) {
  try {
    let res = await fetch(
      `http://127.0.0.1:8000/businesses/${business_slug}/menu/`
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
export async function getGlobalStyling(business_slug: string) {
  try {
    let res = await fetch(
      `http://127.0.0.1:8000/businesses/${business_slug}/menu/global-styling/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching menuData:", error);
  }
}

const getAssetGroups = async () => {
  const res = await fetch("http://127.0.0.1:8000/pickers/icon-pickers");
  if (!res.ok) {
    throw new Error(
      `Failed to fetch asset groups: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
};

export default async function page(props: {
  params: Promise<{ business_slug: string }>;
}) {
  const params = await props.params;

  const businessData: Business = await getBusinessData(params.business_slug);
  const menuData: MenuData = await getMenuData(params.business_slug);

  const globalStylingData: MenuGlobalStyling = await getGlobalStyling(
    params.business_slug
  );
  const assetGroups: AssetGroupType[] = await getAssetGroups();

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
