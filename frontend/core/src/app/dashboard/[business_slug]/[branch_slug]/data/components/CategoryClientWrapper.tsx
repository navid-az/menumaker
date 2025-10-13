"use client";

import React from "react";

//components
import { DataTable } from "@/app/dashboard/categories/data-table";

import { categoryColumns } from "@/app/dashboard/categories/columns";

//types
import { MenuCategory } from "@/app/types/api/menu";

export default function CategoryClientWrapper({
  businessSlug,
  categories,
  assetGroups,
}: {
  businessSlug: string;
  categories: MenuCategory[];
  assetGroups: any[];
}) {
  const columns = categoryColumns(assetGroups);
  return <DataTable columns={columns} data={categories} />;
}
