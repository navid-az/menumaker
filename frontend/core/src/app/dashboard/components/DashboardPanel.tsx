"use client";

import React from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

function DashboardPanel({ children }: { children: React.ReactNode }) {
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  return (
    <ResizablePanel
      className="relative h-full rounded-tr-3xl bg-soft-blue"
      defaultSize={lg ? 80 : md ? 72 : 80}
    >
      {children}
    </ResizablePanel>
  );
}

export default DashboardPanel;
