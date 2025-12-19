//functions
import { getBusinessSubscription } from "../subscription/getBusinessSubscription";

//types
import { type Subscription } from "@/app/types/api/subscription";

export async function checkFeatureAccess(
  businessSlug: string,
  featureCode: string
) {
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
