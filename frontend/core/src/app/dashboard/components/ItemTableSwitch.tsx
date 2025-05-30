// components/table/BooleanSwitchCell.tsx
"use client";

import { useState, useTransition } from "react";

//components
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

//actions
import { updateItem } from "@/app/actions";
import { Item } from "../items/columns";

//types
import { Row } from "@tanstack/react-table";
interface BooleanSwitchCellProps {
  initial: boolean;
  row: Row<Item>;
  fieldName: "is_active" | "is_available";
}

export default function ItemTableSwitch({
  initial,
  row,
  fieldName,
}: BooleanSwitchCellProps) {
  const [checked, setChecked] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (checked: boolean) => {
    setChecked(checked);

    const formData = new FormData();
    formData.append(fieldName, `${checked}`);

    startTransition(async () => {
      const isUpdated = await updateItem(
        row.original.business,
        row.original.id,
        formData
      );

      if (!isUpdated) {
        toast.error("خطا در اعمال تغییرات");
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
