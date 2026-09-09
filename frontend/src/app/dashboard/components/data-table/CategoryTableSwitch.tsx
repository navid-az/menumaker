import { useTransition, useState } from "react";

//components
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

//actions
import { updateCategory } from "@/app/actions";

export default function CategoryTableSwitch({
  originalValue,
  businessSlug,
  categoryId,
  rowId,
}: {
  originalValue: boolean;
  businessSlug: string;
  categoryId: number;
  rowId: string;
}) {
  const [checked, setChecked] = useState(originalValue);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (checked: boolean) => {
    setChecked(checked);

    startTransition(async () => {
      const isUpdated = await updateCategory(businessSlug, categoryId, {
        is_active: checked,
      });

      if (!isUpdated) {
        toast.error("خطا در اعمال تغییرات");
        setChecked(originalValue);
      }
    });
  };

  return (
    <Switch
      checked={checked}
      onCheckedChange={handleToggle}
      disabled={isPending}
      id={rowId}
    />
  );
}
