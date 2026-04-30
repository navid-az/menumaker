//components
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardPanel from "./components/DashboardPanel";

//functions
import { getUserBusinesses } from "@/lib/getUserBusinesses";

export type BranchType = {
  id: number;
  slug: string;
  name: string;
  address?: string;
  phone_number?: string;
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
  social_links?: [];
  phone_numbers?: [];
  locations?: [];
  branches: BranchType[];
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businesses: BusinessType[] = await getUserBusinesses();
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
