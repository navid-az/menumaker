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

//libraries
import { getTranslations } from "next-intl/server";

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

  const t = await getTranslations('dashboard.liveManagement')

  return (
    <section className="flex gap-4 flex-wrap w-full">
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
              <CircleAlert />
            </EmptyMedia>
            <EmptyTitle>{t('empty.title')}</EmptyTitle>
            <EmptyDescription className="min-w-2xl">
              {t('empty.description')}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateTableForm
              businessSlug={business_slug}
              branchSlug={branch_slug}
              title={t('empty.button.title')}
              description={t('empty.button.description')}
            >
              <Button
                size="lg"
                className="scale-pro rounded-full border-2 border-primary bg-soft-blue px-4 font-semibold text-primary transition-all duration-200 hover:scale-95 hover:bg-primary hover:text-primary-foreground data-[state=open]:scale-95 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
              >
                <Plus className="h-5 w-5"></Plus>
                <p>{t('empty.button.title')}</p>
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