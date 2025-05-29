import React from "react";

//components
import ItemClientWrapper from "../components/ItemClientWrapper";

//types
import { Item } from "@/app/dashboard/items/columns";
import { Category } from "@/app/dashboard/categories/columns";

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

//menu categories data
async function getMenuCategoriesData(menu_id: string): Promise<Category[]> {
  const data = await fetch(
    `http://127.0.0.1:8000/business/${menu_id}/categories/`,
    {
      next: { tags: ["categories"] },
    }
  );
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
  const categoriesData = await getMenuCategoriesData(params.menu_id);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">آیتم ها</h2>
      <ItemClientWrapper
        businessSlug={params.menu_id}
        categories={categoriesData}
        items={itemsData}
      ></ItemClientWrapper>
      {/* <DataTable columns={itemColumns} data={itemsData} /> */}
    </div>
  );
}
