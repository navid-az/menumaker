//components
import {
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardPanel from "./components/DashboardPanel";

//functions
import { getUserBusinesses } from "@/lib/getUserBusinesses";

//types
import { type Business } from "../types/api/business";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businesses: Business[] = await getUserBusinesses();
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
