// components/table/BooleanSwitchCell.tsx
"use client";

import { useState, useTransition } from "react";
import { useParams } from "next/navigation";

//components
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

//actions
import { updateItem } from "@/app/actions";

//types
import { Row } from "@tanstack/react-table";
import { MenuItem } from "@/app/types/api/menu";
interface BooleanSwitchCellProps {
  initial: boolean;
  row: Row<MenuItem>;
  fieldName: "is_active" | "is_available";
}

export default function ItemTableSwitch({
  initial,
  row,
  fieldName,
}: BooleanSwitchCellProps) {
  const [checked, setChecked] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const params = useParams<{ business_slug: string; branch_slug: string }>();

  const handleToggle = (checked: boolean) => {
    setChecked(checked);

    startTransition(async () => {
      const res = await updateItem(
        row.original.business,
        row.original.id,
        { [fieldName]: checked },
        params.branch_slug
      );

      if (!res?.success) {
        toast.error(res?.error || "خطا در اعمال تغییرات");
        setChecked(initial); // revert
      }
    });
  };

  return (
    <Switch
      disabled={isPending}
      checked={checked}
      onCheckedChange={handleToggle}
      id={row.id}
    />
  );
}
