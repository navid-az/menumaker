import { Suspense } from "react";

//functions
import getTables from "@/lib/business/getTables";

//components
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import LiveCards from "@/app/[locale]/dashboard/components/LiveCards";
import { CreateTableForm } from "@/app/[locale]/dashboard/components/CreateTableForm";
import UpgradePlanAlertDialog from "@/app/[locale]/dashboard/components/UpgradePlanAlertDialog";
import { LiveManagementSkeleton } from "@/app/components/skeletons/LiveManagementSkeleton";

//SVGs
import { Plus, CircleAlert } from "lucide-react";

//types
import { type Order } from "@/app/types/api/menu";
export type TableType = {
  id: number;
  code: string;
  active_session?: {
    code: string;
    started_at: string;
    expires_at: string;
    is_active: boolean;
  };
  active_call?: {
    resolved: boolean;
    created_at: string;
    expires_at: string;
  };
  order?: Order;
  name: string;
  seats: number;
  location_description?: string;
  is_active?: boolean;
  is_occupied?: boolean;
  is_reserved?: boolean;
  is_requesting_assistance?: boolean;
};

export default function Page(props: {
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  return (
    <div className="flex gap-4 flex-1">
      <Suspense fallback={<LiveManagementSkeleton />}>
        <LiveManagementContent paramsPromise={props.params} />
      </Suspense>
    </div>
  );
}

async function LiveManagementContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const { business_slug, branch_slug } = await paramsPromise;
  const tables = await getTables(business_slug, branch_slug);

  return (
    <section className="flex gap-4 flex-row-reverse flex-wrap w-full">
      {tables.length > 0 ? (
        <LiveCards
          businessSlug={business_slug}
          branchSlug={branch_slug}
          tables={tables}
        />
      ) : (
        <Empty className="w-full h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleAlert></CircleAlert>
            </EmptyMedia>
            <EmptyTitle>هیچ میز و یا سفارشی برای نمایش وجود ندارد</EmptyTitle>
            <EmptyDescription>
              شما هیچ میزی ایجاد نکرده اید. با ساخت یک میز جدید شروع کنید
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateTableForm
              businessSlug={business_slug}
              branchSlug={branch_slug}
              title="ایجاد میز"
              description="با انتخاب گزینه های مورد نظر دسته بندی جدید به منو اضافه کنید"
            >
              <Button
                size="lg"
                className="scale-pro rounded-full border-2 border-primary bg-soft-blue px-4 font-semibold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
              >
                <Plus className="ml-2 h-5 w-5"></Plus>
                <p>ایجاد میز جدید</p>
              </Button>
            </CreateTableForm>
          </EmptyContent>
        </Empty>
      )}
      <Suspense>
        <UpgradePlanAlertDialog
          businessSlug={business_slug}
          featureCode="live_management_access"
        />
      </Suspense>
    </section>
  );
}