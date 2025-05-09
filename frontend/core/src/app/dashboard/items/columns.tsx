"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { toast } from "sonner";

//components
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

//actions
import { deleteItem, updateItem } from "@/app/actions";

//SVGs
import { ArrowUpDown, MoreVertical, Trash2, ImageIcon } from "lucide-react";

//types
import { CellContext } from "@tanstack/react-table";
export type Item = {
  id: number;
  image: string;
  name: string;
  category: string;
  business: string; //slug
  price: number;
  is_available: boolean;
  is_active: boolean;
};

const handleSwitch = async (
  props: CellContext<Item, unknown>,
  data: object
) => {
  const isUpdated = await updateItem(
    props.row.original.business,
    props.row.original.id,
    data
  );
  if (!isUpdated) {
    toast.error("خطا در اعمال تغییرات");
  }
};

const handleDelete = async (props: CellContext<Item, unknown>) => {
  const res = await deleteItem(
    props.row.original.business,
    props.row.original.id
  );
  if (res.success) {
    toast.success("آیتم با موفقیت حذف شد");
  } else {
    toast.error(res.error);
  }
};

export const itemColumns: ColumnDef<Item>[] = [
  {
    accessorKey: "image",
    header: "تصویر",
    cell: (props) => (
      <div className="relative h-12 w-12 rounded-md">
        {props.row.original.image ? (
          <Image
            className="rounded-md"
            fill
            alt={props.row.getValue("name")}
            src={`http://127.0.0.1:8000/${props.row.getValue("image")}`}
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
          نام
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "گروه",
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="-mr-3"
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          قیمت
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "is_available",
    header: "موجود",
    cell: (props) => (
      <Switch
        checked={props.cell.getValue() as boolean}
        onCheckedChange={(checked: boolean) =>
          handleSwitch(props, {
            is_available: checked,
          })
        }
        id={props.row.id}
      ></Switch>
    ),
  },
  {
    accessorKey: "is_active",
    header: "فعال",
    cell: (props) => (
      <Switch
        // isLoading
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
                آیا از حذف این آیتم({props.row.getValue("name")}) مطمعنی؟
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
        <Button className="rounded-full" variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5"></MoreVertical>
        </Button>
      </div>
    ),
  },
];
