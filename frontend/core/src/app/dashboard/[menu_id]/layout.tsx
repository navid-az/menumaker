import React from "react";

//components
import ToolBar from "../components/ToolBar";

export default function DashboardPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToolBar></ToolBar>
      {children}
    </>
  );
}
