import React from "react";

//components
import { DashboardHeader } from "../../components/DashboardHeader";
import ToolBar from "../../components/ToolBar";

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

async function getBranches(business_slug: string) {
  const data = await fetch(
    `http://127.0.0.1:8000/business/${business_slug}/branches/`,
    {
      next: { tags: ["branches"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.json();
}

async function getBranches(business_slug: string) {
  const data = await fetch(
    `http://127.0.0.1:8000/business/${business_slug}/branches/`,
    {
      next: { tags: ["branches"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }
  return data.json();
}

export default async function DashboardPanelLayout(props: {
  children: React.ReactNode;
  params: Promise<{ business_slug: string; branch_slug: string }>;
}) {
  const params = await props.params;
  const { children } = props;

  const assetGroups = await getAssetGroups();
  const categories = await getCategories(params.business_slug);
  const branches = await getBranches(params.business_slug);

  const branchOptions = branches.map(
    (branch: { id: number; name: string }) => ({
      id: branch.id,
      name: branch.name,
    })
  );
  const branches = await getBranches(params.business_slug);

  const branchOptions = branches.map(
    (branch: { id: number; name: string }) => ({
      id: branch.id,
      name: branch.name,
    })
  );

  return (
    <div className="h-screen flex flex-col">
      <DashboardHeader
        business_slug={params.business_slug}
        branch_slug={params.branch_slug}
      ></DashboardHeader>
      <div className="bg-white p-4 flex-1 overflow-y-auto! rounded-tr-3xl">
        <ToolBar categories={categories} assetGroups={assetGroups}></ToolBar>
        {children}
      </div>
    </div>
  );
}
