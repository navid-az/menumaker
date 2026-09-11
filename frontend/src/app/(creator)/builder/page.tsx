//components
import MenuMaker from "./components/MenuMaker";

//functions
import getSubscriptionPlans from "@/lib/subscription/getSubscriptionPlans";
import { getUserBusinesses } from "@/lib/business/getUserBusinesses";
import getAssetGroups from "@/lib/assets/getAssetGroups";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Page() {
  const plans = await getSubscriptionPlans();
  const assetGroups = await getAssetGroups('icon');
  const businesses = await getUserBusinesses();

  return (
    <MenuMaker
      plans={plans}
      assetGroups={assetGroups}
      businesses={businesses}
    ></MenuMaker>
  );
}
