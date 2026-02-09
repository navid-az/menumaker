import BuilderTest, {
  BuilderFormType,
} from "@/app/(creator)/builder/components/builder/BuilderTest";
import { BusinessType } from "@/app/dashboard/layout";

//types
import { type MenuGlobalStyling } from "@/app/types/api/menu";
import { type Menu as MenuData } from "@/app/types/api/menu";
import { redirect } from "next/navigation";

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
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const params = await props.params;

  const businessData: BusinessType = await getBusinessData(
    params.business_slug
  );
  const menuData: MenuData = await getMenuData(params.business_slug);
  const globalStyling: MenuGlobalStyling = await getGlobalStyling(
    params.business_slug
  );
  const assetGroups = await getAssetGroups();

  const colorPlatte = [
    globalStyling.primary_color,
    globalStyling.secondary_color,
    globalStyling.tertiary_color,
    globalStyling.bg_color,
  ];

  const normalizedData: BuilderFormType = {
    ...menuData,
    welcome_page_layout: "none",
    menu_sections: [],
    business: { ...businessData },
    global_styling: { color_palette: colorPlatte, ...globalStyling },
    frontend_only: { suggested_palette_enabled: false },
  };
  console.log(businessData);

  return (
    <div>
      <BuilderTest
        // ref={updateFormRef}
        businessData={businessData}
        defaultValues={normalizedData}
        assetGroups={assetGroups}
      ></BuilderTest>
    </div>
  );
}
