"use client";

import React from "react";

//components
import { DataTable } from "@/app/dashboard/categories/data-table";

import {
  type Category,
  categoryColumns,
} from "@/app/dashboard/categories/columns";

export default function CategoryClientWrapper({
  businessSlug,
  categories,
  assetGroups,
}: {
  businessSlug: string;
  categories: Category[];
  assetGroups: any[];
}) {
  const columns = categoryColumns(businessSlug, assetGroups);
  return <DataTable columns={columns} data={categories} />;
}
