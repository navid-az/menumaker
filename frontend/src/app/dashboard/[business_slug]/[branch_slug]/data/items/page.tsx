import React from "react";

//components
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import ItemClientWrapper from "../components/ItemClientWrapper";
import { CreateCategoryForm } from "@/app/dashboard/components/CreateCategoryForm";
import { CreateItemForm } from "@/app/dashboard/components/CreateItemForm";


//types
import { type MenuCategory } from "@/app/types/api/menu";
import { type MenuItem } from "@/app/types/api/menu";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

//SVGs
import { CircleAlert } from "lucide-react";

//menu items data
async function getVisibleItems(
  business_slug: string,
  branch_slug: string
): Promise<MenuItem[]> {
  const data = await fetch(
    `${SERVER_API_BASE_URL}/businesses/${business_slug}/items/?branch_slug=${branch_slug}&scope=visible`,
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
): Promise<MenuItem[]> {
  const data = await fetch(
    `${SERVER_API_BASE_URL}/businesses/${business_slug}/items/?branch_slug=${branch_slug}&scope=hidden`,
    {
      next: { tags: ["items"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.json();
}

const getAssetGroups = async () => {
  const res = await fetch(`${SERVER_API_BASE_URL}/pickers/icon-pickers`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch asset groups: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
};

//menu categories data
async function getMenuCategoriesData(
  business_slug: string
): Promise<MenuCategory[]> {
  const data = await fetch(
    `${SERVER_API_BASE_URL}/businesses/${business_slug}/categories`,
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

  const assetGroups = await getAssetGroups();
  const categoriesData = await getMenuCategoriesData(params.business_slug);

  const hasCategories = categoriesData.length > 0;
  const hasItems = categoriesData.some(category => category.items.length > 0);

  return (
    <div className="flex flex-col gap-4 flex-1 justify-start">
      {!hasCategories ? (
        <Empty className="w-full h-full">
          {/* Category Empty State */}
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleAlert />
            </EmptyMedia>
            <EmptyTitle>هیچ دسته‌بندی‌ ای برای نمایش وجود ندارد</EmptyTitle>
            <EmptyDescription className="min-w-2xl">
              شما هیچ دسته‌بندی‌ ای ایجاد نکرده‌ اید. با ایجاد یک دسته‌بندی جدید شروع کنید
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateCategoryForm
              assetGroups={assetGroups}
              title="ایجاد دسته‌بندی جدید"
              description="با انتخاب گزینه‌های مورد نظر دسته‌بندی جدید به منو اضافه کنید"
              businessSlug={params.business_slug}
            />
          </EmptyContent>
        </Empty>
      ) : !hasItems ? (
        <Empty className="w-full h-full">
          {/* Item Empty State */}
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleAlert />
            </EmptyMedia>
            <EmptyTitle>هیچ آيتمی برای نمایش وجود ندارد</EmptyTitle>
            <EmptyDescription className="min-w-2xl">
              شما هیچ آیتمی ایجاد نکرده اید. با ایجاد یک آیتم جدید شروع کنید
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateItemForm
              businessSlug={params.business_slug}
              branchSlug={params.branch_slug}
              categories={categoriesData}
              title="ایجاد آیتم جدید"
              description="با انتخاب گزینه های مورد نظر آیتم جدید به منو اضافه کنید"
            ></CreateItemForm>
          </EmptyContent>
        </Empty>
      ) : (
        <ItemClientWrapper
          businessSlug={params.business_slug}
          categories={categoriesData}
          visibleItems={visibleItems}
          hiddenItems={hiddenItems}
        />
      )}
    </div>
  );
}
