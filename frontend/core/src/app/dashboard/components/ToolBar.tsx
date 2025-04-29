"use client";

import React from "react";

//components
import { Button } from "@/components/ui/button";
import { DashboardTabs, DashboardTabsTrigger } from "./DashboardTabs";
import { CreateItemForm } from "./CreateItemForm";
import FormDialog from "./FormDialog";

//hooks
import { usePathname } from "next/navigation";

//SVGs
import { Filter } from "lucide-react";
import { CreateCategoryForm } from "./CreateCategoryForm";

//types
import { AssetGroupType } from "@/components/global/AssetPicker";

export default function ToolBar({
  assetGroups,
}: {
  assetGroups: AssetGroupType[];
}) {
  const pathName = usePathname();

  const sections = pathName.split("/").filter((section) => section);
  const businessSlug = sections[sections.indexOf("dashboard") + 1];
  const lastTwoSections = sections.slice(-2);
  const parentSection = lastTwoSections[0];
  const childSection = lastTwoSections[1];

  return (
    <div className="sticky top-0 z-40 flex h-max w-full items-center justify-between gap-2 rounded-full bg-sad-blue p-2">
      {/* section specific navigator */}
      {parentSection === "data" ? (
        <DashboardTabs>
          <DashboardTabsTrigger
            path="items"
            title="آیتم ها"
          ></DashboardTabsTrigger>
          <DashboardTabsTrigger
            path="categories"
            title="دسته بندی ها"
          ></DashboardTabsTrigger>
          <DashboardTabsTrigger
            disabled
            path="offers"
            title="تخفیف ها"
          ></DashboardTabsTrigger>
          <DashboardTabsTrigger
            disabled
            path="costs"
            title="هزینه های مازاد"
          ></DashboardTabsTrigger>
        </DashboardTabs>
      ) : parentSection === "insights" ? (
        <DashboardTabs>
          <DashboardTabsTrigger
            path="items"
            title="سفارشات آنلاین"
          ></DashboardTabsTrigger>
          <DashboardTabsTrigger
            path="categories"
            title="سفارشات حضوری"
          ></DashboardTabsTrigger>
          <DashboardTabsTrigger
            disabled
            path="offers"
            title="بررسی کلی"
          ></DashboardTabsTrigger>
        </DashboardTabs>
      ) : (
        ""
      )}
      {/* tab specific tools  */}
      {parentSection === "data" && childSection === "items" && (
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            className="scale-pro h-11 w-11 rounded-full border-2 border-primary bg-soft-blue font-bold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
          >
            <Filter className="h-5 w-5"></Filter>
          </Button>
          <FormDialog
            title="ایجاد آیتم"
            description="با انتخاب گزینه های مورد نظر آیتمی جدید به منو اضافه کنید"
            form="item-form"
          >
            <CreateItemForm></CreateItemForm>
          </FormDialog>
        </div>
      )}
      {parentSection === "data" && childSection === "categories" && (
        <CreateCategoryForm
          businessSlug={businessSlug}
          assetGroups={assetGroups}
          title="ایجاد دسته بندی"
          description="با انتخاب گزینه های مورد نظر دسته بندی جدید به منو اضافه کنید"
        ></CreateCategoryForm>
      )}
      {/* add more here if needed */}
    </div>
  );
}
