"use client";

import React from "react";

//components
import { DataTable } from "@/app/[locale]/dashboard/personnel/data-table";

//types
import {
  type Personnel,
  personnelColumns,
} from "@/app/[locale]/dashboard/personnel/columns";
import { useTranslations } from "next-intl";

export default function PersonnelClientWrapper({
  businessSlug,
  branchSlug,
  personnel,
}: {
  businessSlug: string;
  branchSlug: string;
  personnel: Personnel[];
}) {
  const t = useTranslations("dashboard.personnel.dataTable")
  const PersonnelColumns = personnelColumns(businessSlug, branchSlug, t);

  return <DataTable columns={PersonnelColumns} data={personnel} />;
}
