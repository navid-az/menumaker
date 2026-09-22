"use client";

import React from "react";

//components
import { DataTable } from "@/app/[locale]/dashboard/categories/data-table";

import { categoryColumns } from "@/app/[locale]/dashboard/categories/columns";

//types
import { MenuCategory } from "@/app/types/api/menu";
import { useTranslations } from "next-intl";

export default function CategoryClientWrapper({
  businessSlug,
  categories,
  assetGroups,
}: {
  businessSlug: string;
  categories: MenuCategory[];
  assetGroups: any[];
}) {
  const t = useTranslations('dashboard.data.categories')

  const columns = categoryColumns(assetGroups, t);
  return (<div className="flex flex-col gap-4">
    <h2 className="text-xl">{t('dataTable.title')}</h2>
    <DataTable columns={columns} data={categories} />
  </div>);
}
