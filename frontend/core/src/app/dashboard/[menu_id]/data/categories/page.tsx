import React from "react";

import { DataTable } from "@/app/dashboard/categories/data-table";
import { Category, categoryColumns } from "@/app/dashboard/categories/columns";

//server function
import { revalidatePath } from "next/cache";

//menu categories data
async function getMenuCategoriesData(menu_id: string): Promise<Category[]> {
  const data = await fetch(
    `http://127.0.0.1:8000/menu/${menu_id}/categories/`,
    {
      next: { tags: ["categories"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }

  revalidatePath("/dashboard/insights");
  return data.json();
}

export default async function Page({
  params,
}: {
  params: { menu_id: string };
}) {
  const categoriesData = await getMenuCategoriesData(params.menu_id);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">دسته بندی ها</h2>
      <DataTable columns={categoryColumns} data={categoriesData} />
    </div>
  );
}
