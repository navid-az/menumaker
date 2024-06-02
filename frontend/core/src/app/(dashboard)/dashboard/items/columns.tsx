"use client";

import { updateItem } from "@/app/actions";
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Items = {
  id: number;
  image: string;
  name: string;
  menu: string; //slug
  price: number;
  is_available: boolean;
  is_active: boolean;
};

const handleSwitch = (columnId: string) => {};

export const columns: ColumnDef<Items>[] = [
  {
    accessorKey: "image",
    header: "تصویر",
    cell: (props) => (
      <div className="relative h-12 w-12 rounded-md">
        <Image
          className="rounded-md"
          fill
          alt="nigga"
          src={`http://127.0.0.1:8000/${props.row.getValue("image")}`}
        ></Image>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "نام",
  },
  {
    accessorKey: "price",
    header: "قیمت",
  },
  {
    accessorKey: "is_available",
    header: "موجود",
    cell: (props) => (
      <Switch
        checked={props.cell.getValue() as boolean}
        onCheckedChange={(checked: boolean) =>
          updateItem(props.row.original.menu, props.row.original.id, {
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
        checked={props.cell.getValue() as boolean}
        onCheckedChange={(checked: boolean) =>
          updateItem(props.row.original.menu, props.row.original.id, {
            is_active: checked,
          })
        }
        id={props.row.id}
      ></Switch>
    ),
  },
];
