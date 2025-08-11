"use client";

import React from "react";

import { useParams } from "next/navigation";

//components
import { Button } from "@/components/ui/button";
import { DashboardTabs, DashboardTabsTrigger } from "./DashboardTabs";
import { CreateItemForm } from "./CreateItemForm";
import { CreateTableForm } from "./CreateTableForm";
import FormDialog from "./FormDialog";

//hooks
import { usePathname } from "next/navigation";

//SVGs
import { Filter, Plus } from "lucide-react";
import { CreateCategoryForm } from "./CreateCategoryForm";

//types
import { AssetGroupType } from "@/components/global/AssetPicker";
import { Category } from "../categories/columns";

export default function ToolBar({
  assetGroups,
  categories,
}: {
  assetGroups: AssetGroupType[];
  categories: Category[];
}) {
  const pathName = usePathname();
  const params = useParams<{ business_slug: string; branch_slug: string }>();

  const sections = pathName.split("/").filter((section) => section);
  const businessSlug = sections[sections.indexOf("dashboard") + 1];
  const lastTwoSections = sections.slice(-2);
  const parentSection = lastTwoSections[0];
  const childSection = lastTwoSections[1];

  return (
    <div className="sticky backdrop-blur-xl bg-sad-blue/60 border border-royal-green/20 top-0 z-40 flex h-max w-full items-center justify-between gap-2 rounded-full  p-2">
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
      ) : parentSection === "liveManagement" && childSection === "all" ? (
        <DashboardTabs>
          <DashboardTabsTrigger path="all" title="همه"></DashboardTabsTrigger>
          <DashboardTabsTrigger
            path="in-person"
            title="بر روی میز"
          ></DashboardTabsTrigger>
          <DashboardTabsTrigger
            path="online"
            title="سفارش آنلاین"
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
          <CreateItemForm
            businessSlug={businessSlug}
            categories={categories}
            title="ایجاد آیتم"
            description="با انتخاب گزینه های مورد نظر آیتم جدید به منو اضافه کنید"
          ></CreateItemForm>
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
      {parentSection === "liveManagement" && childSection === "all" && (
        <CreateTableForm
          branchSlug={params.branch_slug}
          title="ایجاد میز"
          description="با انتخاب گزینه های مورد نظر دسته بندی جدید به منو اضافه کنید"
        >
          <Button
            size="lg"
            className="scale-pro rounded-full border-2 border-primary bg-soft-blue px-4 font-semibold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
          >
            <Plus className="ml-2 h-5 w-5"></Plus>
            <p>ایجاد میز</p>
          </Button>
        </CreateTableForm>
      )}
      {/* add more here if needed */}
    </div>
  );
}
