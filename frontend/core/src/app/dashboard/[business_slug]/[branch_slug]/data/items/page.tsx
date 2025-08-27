import React from "react";

//components
import ItemClientWrapper from "../components/ItemClientWrapper";

//types
import { Item } from "@/app/dashboard/items/columns";
import { Category } from "@/app/dashboard/categories/columns";

//menu items data
async function getVisibleItems(
  business_slug: string,
  branch_slug: string
): Promise<Item[]> {
  const data = await fetch(
    `http://127.0.0.1:8000/business/${business_slug}/items/visible/?branch_slug=${branch_slug}`,
    {
      next: { tags: ["items"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.json();
}
async function getHiddenItems(
  business_slug: string,
  branch_slug: string
): Promise<Item[]> {
  const data = await fetch(
    `http://127.0.0.1:8000/business/${business_slug}/items/hidden/?branch_slug=${branch_slug}`,
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
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const params = await props.params;

  const visibleItems = await getVisibleItems(
    params.business_slug,
    params.branch_slug
  );
  const hiddenItems = await getHiddenItems(
    params.business_slug,
    params.branch_slug
  );

  const categoriesData = await getMenuCategoriesData(params.business_slug);

  return (
    <div className="flex flex-col gap-4">
      <ItemClientWrapper
        businessSlug={params.business_slug}
        categories={categoriesData}
        visibleItems={visibleItems}
        hiddenItems={hiddenItems}
      ></ItemClientWrapper>
    </div>
  );
}
