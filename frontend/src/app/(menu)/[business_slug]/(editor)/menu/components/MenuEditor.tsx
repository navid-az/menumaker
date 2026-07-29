"use client";

import React from "react";

//components
import { useRouter, useSearchParams } from "next/navigation";
import BuilderTest, {
  BuilderFormType,
} from "@/app/(creator)/builder/components/builder/BuilderTest";

//types
import { type Business } from "@/app/types/api/business";
import { type Menu } from "@/app/types/api/menu";
import { type AssetGroupType } from "@/components/global/AssetPicker";
import { type MenuGlobalStyling } from "@/app/types/api/menu";
type MenuEditorProps = {
  businessData: Business;
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

  const colorPalette = [
    globalStylingData.primary_color,
    globalStylingData.secondary_color,
    globalStylingData.tertiary_color,
    globalStylingData.bg_color,
  ].filter((color) => color !== null);

  const normalizedData: BuilderFormType = {
    ...menuData,
    welcome_page_layout: "none",
    menu_sections: [],
    business: { ...businessData },
    global_styling: { color_palette: colorPalette, ...globalStylingData },
    frontend_only: { suggested_palette_enabled: true },
  };
  return (
    <BuilderTest
      businessSlug={businessData.slug}
      defaultValues={normalizedData}
      assetGroups={assetGroups}
      onSuccess={handleSuccess}
    ></BuilderTest>
  );
}
