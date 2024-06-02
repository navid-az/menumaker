"use client";

import { updateItem } from "@/app/actions";
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
//SVGs
import { ArrowUpDown } from "lucide-react";

//types
import { CellContext } from "@tanstack/react-table";

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
    header: "نام",
    sortingFn: "alphanumeric",
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
];
