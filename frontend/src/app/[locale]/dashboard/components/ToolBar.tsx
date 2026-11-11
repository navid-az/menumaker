"use client";

import { useState } from "react";

import { faIR, enUS } from "react-day-picker/locale"

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
import { useLocale, useTranslations } from "next-intl";

import type { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//hooks

//SVGs
import { Filter, Plus, CalendarDays, Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";

//types
import { type AssetGroupType } from "@/components/global/AssetPicker";
import { type MenuCategory } from "@/app/types/api/menu";
import { type Tag } from "@/components/global/TagSelector";
import { Calendar } from "@/components/ui/calendar";


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

  const locale = useLocale()

  const isRecords = parentSection === "records";

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat(
      locale === "fa" ? "fa-IR-u-ca-persian" : "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    ).format(date);

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

  function parseLocalDate(value: string | null): Date | undefined {
    if (!value) return undefined;

    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function formatLocalDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function updateRecordDateRange(range: DateRange | undefined) {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (range?.from) {
      nextParams.set("from", formatLocalDate(range.from));
    } else {
      nextParams.delete("from");
    }

    if (range?.to) {
      nextParams.set("to", formatLocalDate(range.to));
    } else {
      nextParams.delete("to");
    }

    nextParams.delete("page");

    const query = nextParams.toString();

    router.replace(query ? `${pathName}?${query}` : pathName, {
      scroll: false,
    });
  }

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const dateRange: DateRange | undefined = (() => {
    const from = parseLocalDate(searchParams.get("from"));
    const to = parseLocalDate(searchParams.get("to"));

    return from || to ? { from, to } : undefined;
  })();

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
          <Select
            value={searchParams.get("status") ?? "all"}
            onValueChange={(value) =>
              updateRecordParam("status", value)
            }
          >
            <SelectTrigger className="scale-pro h-11 w-40 rounded-full border-2 border-primary bg-soft-blue font-bold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground">
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

          <Popover
            open={isDatePickerOpen}
            onOpenChange={setIsDatePickerOpen}
          >
            <PopoverTrigger asChild>
              <Button
                className="scale-pro h-11 w-max rounded-full border-2 border-primary bg-soft-blue font-bold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
              >
                <CalendarDays className="size-5 shrink-0" />

                {dateRange?.from ? (
                  <span className="truncate">
                    {dateRange.to
                      ? `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
                      : formatDate(dateRange.from)}
                  </span>
                ) : (
                  <span>
                    {t("records.dateRangePlaceholder")}
                  </span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto p-0"
            >
              <Calendar
                captionLayout="dropdown"
                mode="range"
                selected={dateRange}
                locale={locale === 'fa' ? faIR : enUS}
                dir={locale === 'fa' ? 'rtl' : 'ltr'}
                onSelect={(range) => {
                  updateRecordDateRange(range);
                }}
                numberOfMonths={2}
                defaultMonth={dateRange?.from}
              />
            </PopoverContent>
          </Popover>

          {(searchParams.has("search") ||
            searchParams.has("status") ||
            searchParams.has("from") ||
            searchParams.has("to")) && (
              <Button
                size="icon"
                className="scale-pro size-11 rounded-full border-2 border-primary bg-soft-blue font-bold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
                aria-label={t("records.clearFilters")}
                title={t("records.clearFilters")}
                onClick={clearRecordFilters}
              >
                <X className="size-5" />
              </Button>
            )}
        </div>
      )}
    </div>
  );
}