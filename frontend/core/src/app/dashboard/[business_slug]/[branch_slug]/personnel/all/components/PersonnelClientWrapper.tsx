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
  personnel,
}: {
  businessSlug: string;
  personnel: Personnel[];
}) {
  const PersonnelColumns = personnelColumns(businessSlug);

  return <DataTable columns={PersonnelColumns} data={personnel} />;
}
