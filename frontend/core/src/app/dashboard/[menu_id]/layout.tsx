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

const getCategories = async (businessSlug: string) => {
  const res = await fetch(
    `http://127.0.0.1:8000/business/${businessSlug}/categories`
  );
  if (!res.ok) {
    throw new Error(
      `Failed to fetch asset groups: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
};

export default async function DashboardPanelLayout(props: {
  children: React.ReactNode;
  params: Promise<{ menu_id: string }>;
}) {
  const params = await props.params;
  const { children } = props;

  const assetGroups = await getAssetGroups();
  const categories = await getCategories(params.menu_id);

  return (
    <>
      <ToolBar categories={categories} assetGroups={assetGroups}></ToolBar>
      {children}
    </>
  );
}
