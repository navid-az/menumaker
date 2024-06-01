"use client";

import { updateItem } from "@/app/actions";
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";

export type Items = {
  id: number;
  image: string;
  name: string;
  price: number;
  is_available: boolean;
  is_active: boolean;
};

const handleSwitch = (columnId: string) => {};

export const columns: ColumnDef<Items>[] = [
  {
    accessorKey: "image",
    header: "تصویر",
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
          updateItem("venhan", props.row.original.id, {
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
          updateItem("venhan", props.row.original.id, {
            is_active: checked,
          })
        }
        id={props.row.id}
      ></Switch>
    ),
  },
];
