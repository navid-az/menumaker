"use client";

import { useState, useTransition } from "react";

//libraries
import { ColumnDef } from "@tanstack/react-table";
import { CellContext } from "@tanstack/react-table";

//components
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { CreateCategoryForm } from "../components/CreateCategoryForm";
import { toast } from "sonner";

//actions
import { updateCategory, deleteCategory } from "@/app/actions";

//SVGs
import {
  ArrowUpDown,
  Edit2,
  ImageIcon,
  MoreVertical,
  Trash2,
} from "lucide-react";

import { AssetGroupType } from "@/components/global/AssetPicker";
export type Category = {
  id: number;
  business: string;
  name: string;
  icon: { id: number; name: string; image: string };
  is_active: boolean;
};

const handleDelete = async (props: CellContext<Category, unknown>) => {
  const res = await deleteCategory(
    props.row.original.business,
    props.row.original.id
  );
  if (res.success) {
    toast.success("دسته بندی با موفقیت حذف شد");
  } else {
    toast.error(res.error);
  }
};

export const categoryColumns = (
  assetGroups: AssetGroupType[]
): ColumnDef<Category>[] => [
  {
    accessorKey: "icon",
    header: "آیکون",
    cell: (props) => (
      <div className="relative h-12 w-12 rounded-md">
        {props.row.original.icon ? (
          <Image
            className="rounded-md"
            fill
            alt={props.row.original.icon?.name}
            src={`http://127.0.0.1:8000${props.row.original.icon?.image}`}
          ></Image>
        ) : (
          <ImageIcon
            strokeWidth={1.5}
            className="h-12 w-12 text-gray-400"
          ></ImageIcon>
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="-mr-3"
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="ml-2 h-4 w-4" />
          نام
        </Button>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "فعال",
    cell: (props) => {
      const originalValue = props.cell.getValue() as boolean;
      const [checked, setChecked] = useState(originalValue);
      const [isPending, startTransition] = useTransition();

      const handleToggle = (checked: boolean) => {
        setChecked(checked); // update UI instantly

        startTransition(async () => {
          const isUpdated = await updateCategory(
            props.row.original.business,
            props.row.original.id,
            { is_active: checked }
          );

          if (!isUpdated) {
            toast.error("خطا در اعمال تغییرات");
            setChecked(originalValue); // revert on failure
          }
        });
      };

      return (
        <Switch
          checked={checked}
          onCheckedChange={handleToggle}
          disabled={isPending}
          id={props.row.id}
        />
      );
    },
  },
  {
    id: "row-options",
    cell: (props) => {
      return (
        <div className="flex items-center justify-end gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="rounded-full" variant="ghost" size="icon">
                <Trash2 className="h-5 w-5"></Trash2>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>مطمعنی؟</AlertDialogTitle>
                <AlertDialogDescription>
                  آیا از حذف این دسته بندی({props.row.getValue("name")}) مطمعنی؟
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    onClick={() => handleDelete(props)}
                    variant="destructive"
                  >
                    حذف کن
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <CreateCategoryForm
            businessSlug={props.row.original.business}
            assetGroups={assetGroups}
            title="ویرایش دسته بندی"
            description="با تغییر موارد زیر دسته بندی را ویرایش کنید"
            defaultValues={{
              name: props.row.original.name,
              icon: props.row.original.icon,
            }}
            categoryId={props.row.original.id}
          />
        </div>
      );
    },
  },
];
