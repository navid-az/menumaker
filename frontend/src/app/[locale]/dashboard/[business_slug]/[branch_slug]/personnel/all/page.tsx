import React, { Suspense } from "react";

//functions
import getBranches from "@/lib/business/getBranches";
import getPersonnel from "@/lib/personnel/getPersonnel";

//components
import UpgradePlanAlertDialog from "@/app/[locale]/dashboard/components/UpgradePlanAlertDialog";
import PersonnelClientWrapper from "./components/PersonnelClientWrapper";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { CreateUpdatePersonnelForm } from "@/app/[locale]/dashboard/components/CreateUpdatePersonnelForm";
import { DataTableSkeleton } from "@/app/components/skeletons/DataTableSkeleton";

//SVGs
import { CircleAlert } from "lucide-react";

export default function Page(props: {
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  return (
    <div className="flex-1 justify-start flex">
      <Suspense fallback={<DataTableSkeleton />}>
        <PersonnelContent paramsPromise={props.params} />
      </Suspense>
    </div>
  );
}

async function PersonnelContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const { business_slug, branch_slug } = await paramsPromise;

  const personnelData = await getPersonnel(business_slug, branch_slug,);
  const branches = await getBranches(business_slug)

  return (
    <section className="flex gap-4 flex-row-reverse flex-wrap w-full">
      {personnelData.length > 0 ?
        <PersonnelClientWrapper
          businessSlug={business_slug}
          branchSlug={branch_slug}
          personnel={personnelData}
        ></PersonnelClientWrapper> : <Empty className="w-full h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleAlert></CircleAlert>
            </EmptyMedia>
            <EmptyTitle>هیچ پرسنلی برای نمایش وجود ندارد</EmptyTitle>
            <EmptyDescription className="min-w-2xl">
              شما هیچ پرسنلی دعوت نکرده اید. با دعوت یک پرسنل جدید شروع کنید
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateUpdatePersonnelForm
              businessSlug={business_slug}
              branchSlug={branch_slug}
              branches={branches}
              title="دعوت پرسنل"
              description="با انتخاب گزینه های مورد نظر دسته بندی جدید به منو اضافه کنید"
            >
            </CreateUpdatePersonnelForm>
          </EmptyContent>
        </Empty>
      }
      <Suspense>
        <UpgradePlanAlertDialog
          businessSlug={business_slug}
          featureCode="live_management_access"
        />
      </Suspense>
    </section>
  );
}