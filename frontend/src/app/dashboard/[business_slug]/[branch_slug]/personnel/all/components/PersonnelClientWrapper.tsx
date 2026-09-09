"use client";

import React from "react";

//components
import { DataTable } from "@/app/dashboard/personnel/data-table";

//types
import {
  type Personnel,
  personnelColumns,
} from "@/app/dashboard/personnel/columns";

export default function PersonnelClientWrapper({
  businessSlug,
  branchSlug,
  personnel,
}: {
  businessSlug: string;
  branchSlug: string;
  personnel: Personnel[];
}) {
  const PersonnelColumns = personnelColumns(businessSlug, branchSlug);

  return <DataTable columns={PersonnelColumns} data={personnel} />;
}
