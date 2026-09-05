import React from "react";

//components
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import CategoryClientWrapper from "../components/CategoryClientWrapper";
import { CreateCategoryForm } from "@/app/dashboard/components/CreateCategoryForm";

//types
import { type MenuCategory } from "@/app/types/api/menu";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

//functions
import { getAssetGroups } from "@/lib/assets/getAssetGroups";

//SVGs
import { CircleAlert } from "lucide-react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

//menu categories data
async function getMenuCategoriesData(
  business_slug: string
): Promise<MenuCategory[]> {
  const data = await fetch(
    `${SERVER_API_BASE_URL}/businesses/${business_slug}/categories/`,
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

  const assetGroups = await getAssetGroups('icon');
  const categoriesData = await getMenuCategoriesData(params.business_slug);

  return (
    <div className="flex flex-col gap-4 flex-1 justify-start">
      {categoriesData.length > 0 ?
        <> <h2 className="text-xl">دسته بندی ها</h2>
          <CategoryClientWrapper
            businessSlug={params.business_slug}
            assetGroups={assetGroups}
            categories={categoriesData}
          ></CategoryClientWrapper></> : <Empty className="w-full h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleAlert></CircleAlert>
            </EmptyMedia>
            <EmptyTitle>هیچ دسته‌بندی ای برای نمایش وجود ندارد</EmptyTitle>
            <EmptyDescription className="min-w-2xl">
              شما هیچ دسته‌بندی ای ایجاد نکرده اید. با ایجاد یک دسته‌بندی جدید شروع کنید
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateCategoryForm
              assetGroups={assetGroups}
              title="ایجاد دسته‌بندی جدید"
              description="با انتخاب گزینه های مورد نظر دسته بندی جدید به منو اضافه کنید"
              businessSlug={params.business_slug}>
            </CreateCategoryForm>
          </EmptyContent>
        </Empty>
      }
    </div>
  );
}
