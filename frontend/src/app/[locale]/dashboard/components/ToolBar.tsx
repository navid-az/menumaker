"use client";

import { useParams } from "next/navigation";

//components
import { Button } from "@/components/ui/button";
import { DashboardTabs, DashboardTabsTrigger } from "./DashboardTabs";
import { CreateItemForm } from "./CreateItemForm";
import { CreateTableForm } from "./CreateTableForm";
import { CreateCategoryForm } from "./CreateCategoryForm";
import { CreateUpdatePersonnelForm } from "./CreateUpdatePersonnelForm";

//libraries
import { useTranslations } from "next-intl";

//hooks
import { usePathname } from "next/navigation";

//SVGs
import { Filter, Plus } from "lucide-react";

//types
import { type AssetGroupType } from "@/components/global/AssetPicker";
import { type MenuCategory } from "@/app/types/api/menu";
import { type Tag } from "@/components/global/TagSelector";

export default function ToolBar({
  assetGroups,
  categories,
  branches,
}: {
  assetGroups: AssetGroupType[];
  categories: MenuCategory[];
  branches: Tag[];
}) {
  const pathName = usePathname();
  const params = useParams<{ business_slug: string; branch_slug: string }>();

  const sections = pathName.split("/").filter((section) => section);
  const businessSlug = sections[sections.indexOf("dashboard") + 1];
  const lastTwoSections = sections.slice(-2);
  const parentSection = lastTwoSections[0];
  const childSection = lastTwoSections[1];

  const t = useTranslations('dashboard.toolbar')

  if (childSection === "settings") {
    return null;
  } else {
    return (
      <div className="sticky backdrop-blur-xl bg-sad-blue/60 border border-royal-green/20 top-0 z-40 flex h-max w-full items-center justify-between gap-2 rounded-full  p-2">
        {/* section specific navigator */}
        {parentSection === "data" ? (
          <DashboardTabs>
            <DashboardTabsTrigger
              path="items"
              title={t("data.tabs.items")}
            ></DashboardTabsTrigger>
            <DashboardTabsTrigger
              path="categories"
              title={t("data.tabs.categories")}
            ></DashboardTabsTrigger>
            <DashboardTabsTrigger
              disabled
              path="offers"
              title={t("data.tabs.offers")}
            ></DashboardTabsTrigger>
            <DashboardTabsTrigger
              disabled
              path="costs"
              title={t("data.tabs.additionalCosts")}
            ></DashboardTabsTrigger>
          </DashboardTabs>
        ) : parentSection === "liveManagement" && childSection === "all" ? (
          <DashboardTabs>
            <DashboardTabsTrigger path="all" title={t("liveManagement.tabs.all")}></DashboardTabsTrigger>
            <DashboardTabsTrigger
              disabled
              path="in-person"
              title={t("liveManagement.tabs.inPerson")}
            ></DashboardTabsTrigger>
            <DashboardTabsTrigger
              disabled
              path="online"
              title={t("liveManagement.tabs.online")}
            ></DashboardTabsTrigger>
          </DashboardTabs>
        ) : parentSection === "personnel" && childSection === "all" ? (
          <DashboardTabs>
            <DashboardTabsTrigger
              path="all"
              title={t("personnel.tabs.all")}
            ></DashboardTabsTrigger>
            <DashboardTabsTrigger
              disabled
              path="per-branch"
              title={t("personnel.tabs.perBranch")}
            ></DashboardTabsTrigger>
          </DashboardTabs>
        ) : (
          ""
        )}
        {/* tab specific tools  */}
        {parentSection === "data" && childSection === "items" && (
          <div className="flex items-center gap-2">
            <Button
              disabled
              size="icon"
              className="scale-pro h-11 w-11 rounded-full border-2 border-primary bg-soft-blue font-bold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
            >
              <Filter className="h-5 w-5"></Filter>
            </Button>
            <CreateItemForm
              businessSlug={params.business_slug}
              branchSlug={params.branch_slug}
              categories={categories}
              title={t("data.items.create.title")}
              description={t("data.items.create.description")}
            ></CreateItemForm>
          </div>
        )}
        {parentSection === "data" && childSection === "categories" && (
          <CreateCategoryForm
            businessSlug={businessSlug}
            assetGroups={assetGroups}
            title={t("data.categories.create.title")}
            description={t("data.categories.create.description")}
          ></CreateCategoryForm>
        )}
        {parentSection === "liveManagement" && childSection === "all" && (
          <CreateTableForm
            businessSlug={params.business_slug}
            branchSlug={params.branch_slug}
            title={t("liveManagement.tables.create.title")}
            description={t("liveManagement.tables.create.description")}
          >
            <Button
              size="lg"
              className="scale-pro rounded-full border-2 border-primary bg-soft-blue px-4 font-semibold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
            >
              <Plus className="size-5"></Plus>
              <p>{t("liveManagement.tables.create.title")}</p>
            </Button>
          </CreateTableForm>
        )}
        {parentSection === "personnel" && childSection === "all" && (
          <CreateUpdatePersonnelForm
            businessSlug={params.business_slug}
            branchSlug={params.branch_slug}
            branches={branches}
            title={t("personnel.invite.title")}
            description={t("personnel.invite.description")}
          ></CreateUpdatePersonnelForm>
        )}
        {/* add more here if needed */}
      </div>
    );
  }
}
