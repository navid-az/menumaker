"use client";

import React from "react";

//components
import { DataTable } from "@/app/dashboard/categories/data-table";

//types
import { type Item, itemColumns } from "@/app/dashboard/items/columns";
import { type Category } from "@/app/dashboard/categories/columns";

export default function ItemClientWrapper({
  businessSlug,
  categories,
  items,
}: {
  businessSlug: string;
  categories: Category[];
  items: Item[];
}) {
  const columns = itemColumns(businessSlug, categories);
  return <DataTable columns={columns} data={items} />;
}
