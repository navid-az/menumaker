//functions
import { getBusinessSubscription } from "../subscription/getBusinessSubscription";
import { getUserData } from "../getUserData";

import { type Subscription } from "@/app/types/api/subscription";

export async function checkFeatureAccess(
  businessSlug: string,
  featureCode: string
): Promise<{ hasFeature: boolean; subscription?: Subscription }> {
  // Demo user should be able to bypass all restrictions
  const user = await getUserData();

  if (user?.is_demo) {
    return { hasFeature: true };
  }

  const subscription: Subscription =
    await getBusinessSubscription(businessSlug);

  const hasFeature: boolean =
    subscription.status === "active" &&
    subscription.plan.features.some(
      (f: any) => f.code === featureCode && f.is_enabled
    );

  return {
    subscription,
    hasFeature,
  };
}