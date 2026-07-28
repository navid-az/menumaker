import React from "react";

//functions
import { checkFeatureAccess } from "@/lib/guards/checkFeatureAccess";

//components
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import UpgradePlanAlertDialog from "@/app/dashboard/components/UpgradePlanAlertDialog";
import LiveCards from "@/app/dashboard/components/LiveCards";
import { CreateTableForm } from "@/app/dashboard/components/CreateTableForm";

//SVGs
import { Plus, CircleAlert } from "lucide-react";

//types
import { Order } from "@/app/types/api/menu";
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

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

const getTables = async (branchSlug: string) => {
  const res = await fetch(
    `${SERVER_API_BASE_URL}/branches/${branchSlug}/tables`
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch asset groups: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
};

export default async function Page(props: {
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {

  const params = await props.params;
  const { business_slug, branch_slug } = await props.params;
  const { hasFeature } = await checkFeatureAccess(
    business_slug,
    "live_management_access"
  );
  const tables = await getTables(branch_slug);

  return (
    <div className="flex gap-4 flex-1">
      <section className="flex gap-4 flex-row-reverse flex-wrap w-full">
        {tables.length > 0 ?
          <LiveCards
            businessSlug={business_slug}
            branchSlug={branch_slug}
            tables={tables}
          ></LiveCards>
          : <Empty className="w-full h-full">
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
                branchSlug={params.branch_slug}
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
          </Empty>}
        <UpgradePlanAlertDialog
          businessSlug={business_slug}
          hasFeature={hasFeature}
        ></UpgradePlanAlertDialog>
      </section>
    </div>
  );
}
