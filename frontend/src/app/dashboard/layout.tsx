import { Suspense } from "react";

//components
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel
} from "@/components/ui/resizable";
import DashboardSidebar from "./components/DashboardSidebar";
import DemoBanner from "./components/DemoBanner";

//functions
import { getUserData } from "@/lib/getUserData";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-primary">
      <Suspense fallback={null}>
        <DemoBannerSection />
      </Suspense>

      <ResizablePanelGroup
        autoSaveId="dashboard-size"
        direction="horizontal"
        className="flex flex-1"
      >
        <DashboardSidebar />

        <ResizableHandle withHandle />

        <ResizablePanel className="relative bg-primary" defaultSize={80}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

async function DemoBannerSection() {
  const userData = await getUserData();
  return userData ? <DemoBanner isDemo={userData.is_demo} /> : null;
}