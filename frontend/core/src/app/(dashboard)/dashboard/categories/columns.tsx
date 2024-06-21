"use client";

import { ColumnDef } from "@tanstack/react-table";

//components
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

//SVGs
import { ArrowUpDown } from "lucide-react";

//types
export type Category = {
  id: number;
  icon: number;
  name: string;
  is_active: boolean;
};

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "icon",
    header: "آیکون",
    cell: (props) => (
      <div className="relative h-12 w-12 rounded-md">
        <div>{props.row.getValue("icon")}</div>
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
        // isLoading
        checked={props.cell.getValue() as boolean}
        id={props.row.id}
      ></Switch>
    ),
  },
];
