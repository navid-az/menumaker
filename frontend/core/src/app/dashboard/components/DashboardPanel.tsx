import React from "react";
import { ResizablePanel } from "@/components/ui/resizable";

function DashboardPanel({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanel className="relative bg-primary" defaultSize={80}>
      {children}
    </ResizablePanel>
  );
}

export default DashboardPanel;
