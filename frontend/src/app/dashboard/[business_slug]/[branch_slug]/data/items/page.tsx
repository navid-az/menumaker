import React, { Suspense } from "react";

//components
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import ItemClientWrapper from "../components/ItemClientWrapper";
import { CreateCategoryForm } from "@/app/dashboard/components/CreateCategoryForm";
import { CreateItemForm } from "@/app/dashboard/components/CreateItemForm";
import { DataTableSkeleton } from "@/app/components/skeletons/DataTableSkeleton";

//functions
import getAssetGroups from "@/lib/assets/getAssetGroups";
import getMenuItems from "@/lib/business/getMenuItems";
import getMenuCategories from "@/lib/business/getMenuCategories";

//SVGs
import { CircleAlert } from "lucide-react";

type ParamsPromise = Promise<{ business_slug: string; branch_slug: string }>;

export default function Page(props: { params: ParamsPromise }) {
  return (
    <div className="flex flex-col gap-4 flex-1 justify-start">
      <Suspense fallback={<DataTableSkeleton columnCount={5} rowCount={8} />}>
        <ItemsContent paramsPromise={props.params} />
      </Suspense>
    </div>
  );
}

async function ItemsContent({ paramsPromise }: { paramsPromise: ParamsPromise }) {
  const { business_slug, branch_slug } = await paramsPromise;

  const [visibleItems, hiddenItems, assetGroups, categories] = await Promise.all([
    getMenuItems(business_slug, branch_slug, "visible"),
    getMenuItems(business_slug, branch_slug, "hidden"),
    getAssetGroups("icon"),
    getMenuCategories(business_slug),
  ]);

  const hasCategories = categories.length > 0;
  const hasItems = categories.some((category) => category.items.length > 0);

  if (!hasCategories) {
    return (
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
            businessSlug={business_slug}
          />
        </EmptyContent>
      </Empty>
    );
  }

  if (!hasItems) {
    return (
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
            businessSlug={business_slug}
            branchSlug={branch_slug}
            categories={categories}
            title="ایجاد آیتم جدید"
            description="با انتخاب گزینه های مورد نظر آیتم جدید به منو اضافه کنید"
          />
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <ItemClientWrapper
      businessSlug={business_slug}
      categories={categories}
      visibleItems={visibleItems}
      hiddenItems={hiddenItems}
    />
  );
}