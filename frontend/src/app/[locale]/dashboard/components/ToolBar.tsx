"use client";

import { usePathname, useParams, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

//SVGs
import { Filter, Plus } from "lucide-react";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

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
  const params = useParams<{
    business_slug: string;
    branch_slug: string;
  }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const sections = pathName.split("/").filter(Boolean);
  const businessSlug = sections[sections.indexOf("dashboard") + 1];
  const lastTwoSections = sections.slice(-2);
  const parentSection = lastTwoSections[0];
  const childSection = lastTwoSections[1];

  const t = useTranslations("dashboard.toolbar");

  const isRecords = parentSection === "records";

  function updateRecordParam(key: string, value: string) {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    nextParams.delete("page");

    const query = nextParams.toString();
    router.replace(query ? `${pathName}?${query}` : pathName, {
      scroll: false,
    });
  }

  function clearRecordFilters() {
    const nextParams = new URLSearchParams(searchParams.toString());

    ["search", "status", "from", "to", "page"].forEach((key) => {
      nextParams.delete(key);
    });

    const query = nextParams.toString();
    router.replace(query ? `${pathName}?${query}` : pathName, {
      scroll: false,
    });
  }

  const recordStatusOptions: Record<string, string[]> = {
    orders: [
      "pending",
      "accepted",
      "preparing",
      "ready",
      "served",
      "cancelled",
    ],
    "table-sessions": ["active", "closed", "paid", "unpaid", "partial"],
    payments: [
      "pending",
      "successful",
      "failed",
      "canceled",
      "refunded",
    ],
    "service-requests": ["pending", "resolved", "expired"],
  };

  if (childSection === "settings") {
    return null;
  }

  return (
    <div className="sticky top-0 z-40 flex h-max w-full items-center justify-between gap-2 rounded-full border border-royal-green/20 bg-sad-blue/60 p-2 backdrop-blur-xl">
      {/* Section-specific navigation */}
      {parentSection === "data" ? (
        <DashboardTabs>
          <DashboardTabsTrigger
            path="items"
            title={t("data.tabs.items")}
          />
          <DashboardTabsTrigger
            path="categories"
            title={t("data.tabs.categories")}
          />
          <DashboardTabsTrigger
            disabled
            path="offers"
            title={t("data.tabs.offers")}
          />
          <DashboardTabsTrigger
            disabled
            path="costs"
            title={t("data.tabs.additionalCosts")}
          />
        </DashboardTabs>
      ) : parentSection === "liveManagement" &&
        childSection === "all" ? (
        <DashboardTabs>
          <DashboardTabsTrigger
            path="all"
            title={t("liveManagement.tabs.all")}
          />
          <DashboardTabsTrigger
            disabled
            path="in-person"
            title={t("liveManagement.tabs.inPerson")}
          />
          <DashboardTabsTrigger
            disabled
            path="online"
            title={t("liveManagement.tabs.online")}
          />
        </DashboardTabs>
      ) : parentSection === "personnel" &&
        childSection === "all" ? (
        <DashboardTabs>
          <DashboardTabsTrigger
            path="all"
            title={t("personnel.tabs.all")}
          />
          <DashboardTabsTrigger
            disabled
            path="per-branch"
            title={t("personnel.tabs.perBranch")}
          />
        </DashboardTabs>
      ) : isRecords ? (
        <DashboardTabs>
          <DashboardTabsTrigger
            path="orders"
            title={t("records.tabs.orders")}
          />
          <DashboardTabsTrigger
            path="table-sessions"
            title={t("records.tabs.tableSessions")}
          />
          <DashboardTabsTrigger
            path="payments"
            title={t("records.tabs.payments")}
          />
          <DashboardTabsTrigger
            path="service-requests"
            title={t("records.tabs.serviceRequests")}
          />
        </DashboardTabs>
      ) : null}

      {/* Route-specific tools */}
      {parentSection === "data" && childSection === "items" && (
        <div className="flex items-center gap-2">
          <Button
            disabled
            size="icon"
            className="scale-pro h-11 w-11 rounded-full border-2 border-primary bg-soft-blue font-bold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
          >
            <Filter className="h-5 w-5" />
          </Button>

          <CreateItemForm
            businessSlug={params.business_slug}
            branchSlug={params.branch_slug}
            categories={categories}
            title={t("data.items.create.title")}
            description={t("data.items.create.description")}
          />
        </div>
      )}

      {parentSection === "data" && childSection === "categories" && (
        <CreateCategoryForm
          businessSlug={businessSlug}
          assetGroups={assetGroups}
          title={t("data.categories.create.title")}
          description={t("data.categories.create.description")}
        />
      )}

      {parentSection === "liveManagement" &&
        childSection === "all" && (
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
              <Plus className="size-5" />
              <p>{t("liveManagement.tables.create.title")}</p>
            </Button>
          </CreateTableForm>
        )}

      {parentSection === "personnel" &&
        childSection === "all" && (
          <CreateUpdatePersonnelForm
            businessSlug={params.business_slug}
            branchSlug={params.branch_slug}
            branches={branches}
            title={t("personnel.invite.title")}
            description={t("personnel.invite.description")}
          />
        )}

      {/* Records search and filters */}
      {isRecords && (
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2">
          <div className="relative min-w-32 flex-1 sm:max-w-56">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchParams.get("search") ?? ""}
              onChange={(event) =>
                updateRecordParam("search", event.target.value)
              }
              placeholder={t("records.searchPlaceholder")}
              className="h-10 rounded-full ps-9"
            />
          </div>

          <Select
            value={searchParams.get("status") ?? "all"}
            onValueChange={(value) =>
              updateRecordParam("status", value)
            }
          >
            <SelectTrigger className="h-10 w-auto min-w-38 rounded-full">
              <SelectValue placeholder={t("records.statusPlaceholder")} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                {t("records.statuses.all")}
              </SelectItem>

              {(recordStatusOptions[childSection] ?? []).map(
                (status) => (
                  <SelectItem key={status} value={status}>
                    {t(`records.statuses.${status}`)}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={searchParams.get("from") ?? ""}
            onChange={(event) =>
              updateRecordParam("from", event.target.value)
            }
            className="h-10 w-auto min-w-32 rounded-full"
          />

          <Input
            type="date"
            value={searchParams.get("to") ?? ""}
            onChange={(event) =>
              updateRecordParam("to", event.target.value)
            }
            className="h-10 w-auto min-w-32 rounded-full"
          />

          {(searchParams.has("search") ||
            searchParams.has("status") ||
            searchParams.has("from") ||
            searchParams.has("to")) && (
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-full"
                aria-label={t("records.clearFilters")}
                title={t("records.clearFilters")}
                onClick={clearRecordFilters}
              >
                <X className="size-4" />
              </Button>
            )}
        </div>
      )}
    </div>
  );
}