//components
import { BranchSelector } from "./BranchSelector";
import { UserProfile } from "@/components/global/UserProfile";
import { Button } from "@/components/ui/button";
import SubscriptionPopOver from "./SubscriptionPopOver";

//SVGs
import { Menu, User2 } from "lucide-react";

//functions
import { checkFeatureAccess } from "@/lib/guards/checkFeatureAccess";

//libs
import { getUserData } from "@/lib/getUserData";
import { getUserBusinesses } from "@/lib/getUserBusinesses";
import { getBusinessSubscription } from "@/lib/subscription/getBusinessSubscription";

//types
import { type Subscription } from "@/app/types/api/subscription";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

// get all branches of active business
async function getBranches(business_slug: string) {
  const data = await fetch(
    `${SERVER_API_BASE_URL}/businesses/${business_slug}/branches/`,
    {
      next: { tags: ["branches"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.json();
}

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
  const user = await getUserData();
  const businesses = await getUserBusinesses();
  const subEndDate = new Date(subscription.end_date);
  const now = new Date();

  return (
    <header className="flex w-full gap-2 justify-between bg-primary p-2 md:px-4 md:py-4">
      <div className="flex gap-2 flex-1 min-w-0">
        {hasFeature && <BranchSelector branches={branches}></BranchSelector>}
      </div>
      <div className="flex gap-2 flex-none">
        <div className="flex gap-2">
          {subscription.status === "active" && subEndDate > now && (
            <SubscriptionPopOver subscription={subscription} />
          )}
        </div>
        {user && businesses && (
          <UserProfile user={user} businesses={businesses}>
            <Button
              size="icon"
              className=" hover:bg-white/5 transition-all duration-300"
            >
              <User2 className="h-6 w-6 text-soft-blue"></User2>
            </Button>
          </UserProfile>
        )}
      </div>
    </header>
  );
}
