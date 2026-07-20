//components
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardPanel from "./components/DashboardPanel";
import DemoBanner from "./components/DemoBanner";

//functions
import { getUserBusinesses } from "@/lib/getUserBusinesses";
import { getUserData } from "@/lib/getUserData";

//types
import { type Business } from "../types/api/business";
import { type User } from "../types/api/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businesses: Business[] = await getUserBusinesses();
  const userData: User | null = await getUserData();

  return (
    <div className="flex h-screen flex-col bg-primary">
      {userData && <DemoBanner isDemo={userData.is_demo}></DemoBanner>}
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
