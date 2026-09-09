import React, { Suspense } from "react";

//components
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import CategoryClientWrapper from "../components/CategoryClientWrapper";
import { CreateCategoryForm } from "@/app/dashboard/components/CreateCategoryForm";
import { DataTableSkeleton } from "@/app/components/skeletons/DataTableSkeleton";

//functions
import getAssetGroups from "@/lib/assets/getAssetGroups";
import getMenuCategories from "@/lib/business/getMenuCategories";

//SVGs
import { CircleAlert } from "lucide-react";

type ParamsPromise = Promise<{ business_slug: string }>;

export default function Page(props: { params: ParamsPromise }) {
  return (
    <div className="flex flex-col gap-4 flex-1 justify-start">
      <Suspense fallback={<DataTableSkeleton />}>
        <CategoriesContent paramsPromise={props.params} />
      </Suspense>
    </div>
  );
}

async function CategoriesContent({ paramsPromise }: { paramsPromise: ParamsPromise }) {
  const { business_slug } = await paramsPromise;

  const [assetGroups, categoriesData] = await Promise.all([
    getAssetGroups("icon"),
    getMenuCategories(business_slug),
  ]);

  if (categoriesData.length === 0) {
    return (
      <Empty className="w-full h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CircleAlert />
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
            businessSlug={business_slug}
          />
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <>
      <h2 className="text-xl">دسته بندی ها</h2>
      <CategoryClientWrapper businessSlug={business_slug} assetGroups={assetGroups} categories={categoriesData} />
    </>
  );
}