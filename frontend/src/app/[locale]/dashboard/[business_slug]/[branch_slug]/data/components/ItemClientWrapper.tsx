"use client";

import React, { useState, useEffect } from "react";

//components
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/[locale]/dashboard/categories/data-table";

//types
import { itemColumns } from "@/app/[locale]/dashboard/items/columns";
import { MenuCategory } from "@/app/types/api/menu";
import { MenuItem } from "@/app/types/api/menu";
import { _Translator, useTranslations } from "next-intl";

//SVGs
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ItemClientWrapper({
  businessSlug,
  categories,
  visibleItems,
  hiddenItems,
}: {
  businessSlug: string;
  categories: MenuCategory[];
  visibleItems: MenuItem[];
  hiddenItems: MenuItem[];
}) {
  const t = useTranslations('dashboard.data.items')

  const visibleItemColumns = itemColumns(businessSlug, categories, "visible", t);
  const hiddenItemColumns = itemColumns(businessSlug, categories, "hidden", t);
  const [isCollapsed, setIsCollapsed] = useState(true);


  useEffect(() => {
    if (hiddenItems.length === 0) {
      // reset whenever no hidden items
      setIsCollapsed(true);
    }
  }, [hiddenItems.length]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 flex-col">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="w-max">
            <Eye className="w-5 h-5 text-muted-foreground"></Eye>
            <p className="text-muted-foreground text-base">{t('dataTable.titles.branchItems')}</p>
          </Button>
        </div>
        <DataTable columns={visibleItemColumns} data={visibleItems} />
      </div>

      {hiddenItems.length > 0 && (
        <div className="flex gap-4 flex-col">
          <Button
            onClick={() => setIsCollapsed((prev) => !prev)}
            variant="ghost"
            className={cn(
              "w-max gap-4 bg-muted/50 transition-colors duration-300",
              !isCollapsed && "text-primary bg-muted"
            )}
          >
            <div className="flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-muted-foreground"></EyeOff>
              <p className="text-muted-foreground text-base">{t('dataTable.titles.hiddenItems')}</p>
            </div>
            <ArrowLeft
              className={cn(
                "w-5 h-5 rotate-180 rtl:rotate-0 text-muted-foreground mt-0.5 transition-all",
                !isCollapsed && "rotate-270 rtl:-rotate-90"
              )}
            ></ArrowLeft>
          </Button>
          {!isCollapsed && (
            <DataTable columns={hiddenItemColumns} data={hiddenItems} />
          )}
        </div>
      )}
    </div>
  );
}
