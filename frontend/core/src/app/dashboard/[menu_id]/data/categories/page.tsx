import React from "react";

import { type Category } from "@/app/dashboard/categories/columns";
import CategoryClientWrapper from "../components/CategoryClientWrapper";

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

const getAssetGroups = async () => {
  const res = await fetch("http://127.0.0.1:8000/pickers/icon-pickers");
  if (!res.ok) {
    throw new Error(
      `Failed to fetch asset groups: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
};

export default async function Page(props: {
  params: Promise<{ menu_id: string }>;
}) {
  const params = await props.params;

  const assetGroups = await getAssetGroups();
  const categoriesData = await getMenuCategoriesData(params.menu_id);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">دسته بندی ها</h2>
      <CategoryClientWrapper
        businessSlug={params.menu_id}
        assetGroups={assetGroups}
        categories={categoriesData}
      ></CategoryClientWrapper>
      {/* <DataTable columns={categoryColumns} data={categoriesData} /> */}
    </div>
  );
}
