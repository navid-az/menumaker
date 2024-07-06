import React from "react";
import { ResizablePanel } from "@/components/ui/resizable";

function DashboardPanel({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanel
      className="relative h-full rounded-tr-3xl bg-white p-4"
      defaultSize={80}
    >
      {children}
    </ResizablePanel>
  );
}

export default DashboardPanel;
