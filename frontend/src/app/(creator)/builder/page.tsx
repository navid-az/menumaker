export const dynamic = "force-dynamic";

//components
import MenuMaker from "./components/MenuMaker";

//functions
import getSubscriptionPlans from "@/lib/subscription/getSubscriptionPlans";
import { getUserBusinesses } from "@/lib/getUserBusinesses";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

const getAssetGroups = async () => {
  const res = await fetch(`${SERVER_API_BASE_URL}/pickers/icon-pickers`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch asset groups: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
};

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
