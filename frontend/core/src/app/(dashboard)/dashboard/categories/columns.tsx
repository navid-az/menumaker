"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { toast } from "sonner";

//components
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

//actions
import { updateCategory, deleteCategory } from "@/app/actions";

//SVGs
import { ArrowUpDown, ImageIcon, MoreVertical, Trash2 } from "lucide-react";

//types
import { CellContext } from "@tanstack/react-table";
export type Category = {
  id: number;
  menu: string;
  name: string;
  icon: { name: string; image: string };
  is_active: boolean;
};

const handleSwitch = async (
  props: CellContext<Category, unknown>,
  data: object
) => {
  const isUpdated = await updateCategory(
    props.row.original.menu,
    props.row.original.id,
    data
  );
  if (!isUpdated) {
    toast.error("خطا در اعمال تغییرات");
  }
};

const handleDelete = async (props: CellContext<Category, unknown>) => {
  deleteCategory(props.row.original.menu, props.row.original.id);
};

export const categoryColumns: ColumnDef<Category>[] = [
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
            src={`http://127.0.0.1:8000/${props.row.original.icon?.image}`}
          ></Image>
        ) : (
          <ImageIcon
            strokeWidth={1.5}
            className="h-12 w-12 text-primary"
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
    cell: (props) => (
      <Switch
        checked={props.cell.getValue() as boolean}
        onCheckedChange={(checked: boolean) =>
          handleSwitch(props, {
            is_active: checked,
          })
        }
        id={props.row.id}
      ></Switch>
    ),
  },
  {
    id: "row-options",
    cell: (props) => (
      <div className="flex items-center gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
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
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5"></MoreVertical>
        </Button>
      </div>
    ),
  },
];
