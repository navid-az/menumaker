//components
import { BranchSelector } from "./BranchSelector";
import { UserProfile } from "@/components/global/UserProfile";
import { Button } from "@/components/ui/button";
import SubscriptionPopOver from "./SubscriptionPopOver";
import LocaleSwitcher from "@/components/global/LocalSwitcher";

//SVGs
import { User2 } from "lucide-react";

//functions
import { getUserData } from "@/lib/getUserData";
import getBranches from "@/lib/business/getBranches";
import { getUserBusinesses } from "@/lib/business/getUserBusinesses";
import { getBusinessSubscription } from "@/lib/subscription/getBusinessSubscription";
import { checkFeatureAccess } from "@/lib/guards/checkFeatureAccess";

//types
import { type Subscription } from "@/app/types/api/subscription";
import { Business } from "@/app/types/api/business";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getLocale } from "next-intl/server";

export async function DashboardHeader({
  business_slug,
  branch_slug,
}: {
  business_slug: string;
  branch_slug: string;
}) {
  const { hasFeature } = await checkFeatureAccess(
    business_slug,
    "multi_branch"
  );
  const branches = await getBranches(business_slug);

  const subscription: Subscription = await getBusinessSubscription(
    business_slug
  );
  const subEndDate = new Date(subscription.end_date);
  const now = new Date();

  const locale = await getLocale()

  return (
    <header className="flex w-full gap-2 justify-between bg-primary p-2 md:px-4 md:py-3">
      <div className="flex gap-2 flex-1 items-center min-w-0">
        {hasFeature && <BranchSelector branches={branches}></BranchSelector>}
      </div>
      <div className="flex gap-1 flex-none items-center">
        <LocaleSwitcher size='sm' className="text-white hover:bg-white/5 " />
        <div className="flex gap-2">
          {subscription.status === "active" && subEndDate > now && (
            <SubscriptionPopOver locale={locale} subscription={subscription} />
          )}
        </div>
        <Suspense fallback={<Skeleton className="size-10" />}>
          <UserProfileSection locale={locale} />
        </Suspense>
      </div>
    </header>
  );
}

async function UserProfileSection({ locale }: { locale: string }) {
  const user = await getUserData();
  const businesses: Business[] = await getUserBusinesses();


  return <div>
    {user && businesses && (
      <UserProfile locale={locale} user={user} businesses={businesses}>
        <Button
          size="icon"
          className=" hover:bg-white/5 transition-all duration-300 size-9"
        >
          <User2 className="size-5 text-soft-blue"></User2>
        </Button>
      </UserProfile>
    )}
  </div>;
}