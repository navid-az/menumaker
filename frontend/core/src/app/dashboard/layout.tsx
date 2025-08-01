//components
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardPanel from "./components/DashboardPanel";

//functions
import { getUserData } from "@/lib/getUserData";
import { getUserBusinesses } from "@/lib/getUserBusinesses";

export type BranchType = {
  id: number;
  name: string;
  address?: string;
  phone_number?: number;
};

//types
export type BusinessType = {
  id: number;
  owner: number;
  slug: string;
  name: string;
  name_en: string;
  service_type: "online" | "in_person" | "both";
  primary_service_type?: "online" | "in_person";
  branch_count: number;
  social_links?: {};
  phone_numbers?: {};
  locations?: {};
  branches: BranchType[];
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();
  const businesses: BusinessType[] = await getUserBusinesses(user.pk);
  return (
    <div className="flex h-screen flex-col bg-primary">
      <ResizablePanelGroup
        autoSaveId="dashboard-size"
        direction="horizontal"
        className="flex flex-1"
      >
        <DashboardSidebar businesses={businesses}></DashboardSidebar>
        <ResizableHandle withHandle></ResizableHandle>
        <DashboardPanel>{children}</DashboardPanel>
      </ResizablePanelGroup>
    </div>
  );
}
