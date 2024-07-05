import React from "react";
import { DataTable } from "@/app/dashboard/items/data-table";
import { Item, itemColumns } from "@/app/dashboard/items/columns";

//server function
import { revalidatePath } from "next/cache";

//menu items data
async function getMenuItemsData(menu_id: string): Promise<Item[]> {
  const data = await fetch(`http://127.0.0.1:8000/menu/${menu_id}/items/`, {
    next: { tags: ["items"] },
  });
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
  const itemsData = await getMenuItemsData(params.menu_id);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">آیتم ها</h2>
      <DataTable columns={itemColumns} data={itemsData} />
    </div>
  );
}
