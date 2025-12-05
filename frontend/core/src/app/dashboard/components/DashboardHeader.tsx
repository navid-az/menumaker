//components
import { BusinessType } from "../layout";
import { BranchSelector } from "./BranchSelector";
import { UserProfile } from "@/components/global/UserProfile";

// get all branches of active business
async function getBranches(business_slug: string) {
  const data = await fetch(
    `http://127.0.0.1:8000/businesses/${business_slug}/branches/`,
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
  //hard codded for now
  const branches = await getBranches(business_slug);

  return (
    <header className="flex flex-none justify-between bg-primary px-6 py-4">
      <section className="flex justify-between items-center flex-1">
        <BranchSelector branches={branches}></BranchSelector>
        <UserProfile></UserProfile>
      </section>
    </header>
  );
}
