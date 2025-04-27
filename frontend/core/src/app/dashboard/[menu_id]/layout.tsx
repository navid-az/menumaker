import React from "react";

//components
import ToolBar from "../components/ToolBar";

const getAssetGroups = async () => {
  const res = await fetch("http://127.0.0.1:8000/pickers/icon-pickers");
  if (!res.ok) {
    throw new Error(
      `Failed to fetch asset groups: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
};

export default async function DashboardPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const assetGroups = await getAssetGroups();

  return (
    <>
      <ToolBar assetGroups={assetGroups}></ToolBar>
      {children}
    </>
  );
}
