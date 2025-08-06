import React from "react";

//types
import { Item } from "@/app/dashboard/items/columns";
import { Category } from "@/app/dashboard/categories/columns";
import { Plus } from "lucide-react";

//menu items data
async function getMenuItemsData(business_slug: string): Promise<Item[]> {
  const data = await fetch(
    `http://127.0.0.1:8000/business/${business_slug}/items/`,
    {
      next: { tags: ["items"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.json();
}

//menu categories data
async function getMenuCategoriesData(
  business_slug: string
): Promise<Category[]> {
  const data = await fetch(
    `http://127.0.0.1:8000/business/${business_slug}/categories/`,
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
  params: Promise<{ business_slug: string }>;
}) {
  const params = await props.params;
  const itemsData = await getMenuItemsData(params.business_slug);
  const categoriesData = await getMenuCategoriesData(params.business_slug);

  return (
    <div className="flex flex-col gap-4">
      {/* <DataTable columns={itemColumns} data={itemsData} /> */}
      <div className="border-[3px] font-normal max-w-60 gap-2 bg-soft-blue h-[346px] border-dashed transition-all duration-300 scale-pro hover:scale-105 hover:shadow-xl border-sad-blue hover:border-royal-green flex items-center flex-col justify-center rounded-3xl p-4">
        <Plus className="w-14 h-14 text-royal-green" strokeWidth={1}></Plus>
        میز جدید
      </div>
    </div>
  );
}
