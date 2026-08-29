export const dynamic = "force-dynamic";

//components
import MenuMaker from "./components/MenuMaker";

//functions
import getSubscriptionPlans from "@/lib/subscription/getSubscriptionPlans";
import { getUserBusinesses } from "@/lib/getUserBusinesses";
import { getAssetGroups } from "@/lib/assets/getAssetGroups";

export default async function Page() {
  const plans = await getSubscriptionPlans();
  const assetGroups = await getAssetGroups();
  const businesses = await getUserBusinesses();

  return (
    <MenuMaker
      plans={plans}
      assetGroups={assetGroups}
      businesses={businesses}
    ></MenuMaker>
  );
}
