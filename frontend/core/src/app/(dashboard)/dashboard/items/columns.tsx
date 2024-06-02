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
import { ArrowUpDown, MoreVertical } from "lucide-react";

//types
import { CellContext } from "@tanstack/react-table";
import { Trash } from "@/app/components/svgs";

export type Items = {
  id: number;
  image: string;
  name: string;
  category: string;
  menu: string; //slug
  price: number;
  is_available: boolean;
  is_active: boolean;
};

const handleSwitch = async (
  props: CellContext<Items, unknown>,
  data: object
) => {
  const isUpdated = await updateItem(
    props.row.original.menu,
    props.row.original.id,
    data
  );
  if (!isUpdated) {
    toast.error("خطا در اعمال تغییرات");
  }
};

const handleDelete = async (props: CellContext<Items, unknown>) => {
  const res = await deleteItem(props.row.original.menu, props.row.original.id);
  console.log(res, "this is res");
};

export const columns: ColumnDef<Items>[] = [
  {
    accessorKey: "image",
    header: "تصویر",
    cell: (props) => (
      <div className="relative h-12 w-12 rounded-md">
        <Image
          className="rounded-md"
          fill
          alt={props.row.getValue("name")}
          src={`http://127.0.0.1:8000/${props.row.getValue("image")}`}
        ></Image>
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
    accessorKey: "category",
    header: "گروه",
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDown className="ml-2 h-4 w-4" />
          قیمت
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
      <div className="flex items-center gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash className="h-7 w-7"></Trash>
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
        <Button variant="ghost" size="icon">
          <MoreVertical></MoreVertical>
        </Button>
      </div>
    ),
  },
];
