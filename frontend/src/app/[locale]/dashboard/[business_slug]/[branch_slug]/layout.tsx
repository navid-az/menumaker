import React, { Suspense } from "react";

//components
import { DashboardHeader } from "../../components/DashboardHeader";
import ToolBar from "../../components/ToolBar";
import DashboardHeaderSkeleton from "@/app/components/skeletons/DashboardHeaderSkeleton";
import DashboardToolbarSkeleton from "@/app/components/skeletons/DashboardToolbarSkeleton";

//function 
import getAssetGroups from "@/lib/assets/getAssetGroups";
import getMenuCategories from "@/lib/business/getMenuCategories";
import getBranches from "@/lib/business/getBranches";


export default function DashboardPanelLayout(props: {
  children: React.ReactNode;
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const { children } = props;

  return (
    <div className="h-screen flex flex-col">
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <HeaderSection paramsPromise={props.params} />
      </Suspense>

      <div className="bg-white flex flex-col p-4 flex-1 overflow-y-auto! xl:rounded-tr-[40px]">
        <Suspense fallback={<DashboardToolbarSkeleton />}>
          <ToolBarSection paramsPromise={props.params} />
        </Suspense>

        <div className="mt-4 flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}

async function HeaderSection({
  paramsPromise,
}: {
  paramsPromise: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const { business_slug, branch_slug } = await paramsPromise;
  return (
    <DashboardHeader business_slug={business_slug} branch_slug={branch_slug} />
  );
}

async function ToolBarSection({
  paramsPromise,
}: {
  paramsPromise: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const { business_slug } = await paramsPromise;

  // run these in parallel instead of sequential awaits
  const [assetGroups, categories, branches] = await Promise.all([
    getAssetGroups('icon'),
    getMenuCategories(business_slug),
    getBranches(business_slug),
  ]);

  return (
    <ToolBar
      branches={branches}
      categories={categories}
      assetGroups={assetGroups}
    />
  );
}