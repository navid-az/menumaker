"use client";

import React from "react";

//components
import { useRouter, useSearchParams } from "next/navigation";
import BuilderTest, {
  BuilderFormType,
} from "@/app/(creator)/builder/components/builder/BuilderTest";

//types
import { type BusinessType } from "@/app/dashboard/layout";
import { type Menu } from "@/app/types/api/menu";
import { type AssetGroupType } from "@/components/global/AssetPicker";
import { type MenuGlobalStyling } from "@/app/types/api/menu";
type MenuEditorProps = {
  businessData: BusinessType;
  menuData: Menu;
  globalStylingData: MenuGlobalStyling;
  assetGroups: AssetGroupType[];
};

export function MenuEditor({
  businessData,
  menuData,
  globalStylingData,
  assetGroups,
}: MenuEditorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get("returnTo") ?? "/dashboard";

  const handleSuccess = () => {
    router.push(returnTo);
  };

  const colorPlatte = [
    globalStylingData.primary_color,
    globalStylingData.secondary_color,
    globalStylingData.tertiary_color,
    globalStylingData.bg_color,
  ];

  const normalizedData: BuilderFormType = {
    ...menuData,
    welcome_page_layout: "none",
    menu_sections: [],
    business: { ...businessData },
    global_styling: { color_palette: colorPlatte, ...globalStylingData },
    frontend_only: { suggested_palette_enabled: false },
  };
  return (
    <BuilderTest
      businessData={businessData}
      defaultValues={normalizedData}
      assetGroups={assetGroups}
      onSuccess={handleSuccess}
    ></BuilderTest>
  );
}
