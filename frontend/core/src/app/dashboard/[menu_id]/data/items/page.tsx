import React from "react";
import { DataTable } from "@/app/dashboard/items/data-table";
import { Item, itemColumns } from "@/app/dashboard/items/columns";

//menu items data
async function getMenuItemsData(menu_id: string): Promise<Item[]> {
  const data = await fetch(`http://127.0.0.1:8000/business/${menu_id}/items/`, {
    next: { tags: ["items"] },
  });
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.json();
}

export default async function Page(props: {
  params: Promise<{ menu_id: string }>;
}) {
  const params = await props.params;
  const itemsData = await getMenuItemsData(params.menu_id);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">آیتم ها</h2>
      <DataTable columns={itemColumns} data={itemsData} />
    </div>
  );
}
