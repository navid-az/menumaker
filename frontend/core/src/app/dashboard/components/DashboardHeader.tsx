//components
import { BranchSelector } from "./BranchSelector";
import { UserProfile } from "@/components/global/UserProfile";

// get all branches of active business
async function getBranches(menu_id: string) {
  const data = await fetch(
    `http://127.0.0.1:8000/business/${menu_id}/branches/`,
    {
      next: { tags: ["branches"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.json();
}

export async function DashboardHeader() {
  //hard codded for now
  const branches = await getBranches("venhan");

  return (
    <header className="flex h-max w-screen justify-between bg-primary p-4 lg:p-8">
      <section className="flex bg-ping-200 justify-between gap-2">
        <h2 className="font-extrabold text-primary-foreground lg:text-2xl">
          داشبورد مدیریت
        </h2>
      </section>
      <section className="flex mr-24 justify-between items-center flex-1">
        <BranchSelector branches={branches}></BranchSelector>
        <UserProfile></UserProfile>
      </section>
    </header>
  );
}
