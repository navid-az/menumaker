"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

//components
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

//SVGs
import { ArrowUpDown, ImageIcon } from "lucide-react";

//types
export type Category = {
  id: number;
  name: string;
  icon: { name: string; image: string };
  is_active: boolean;
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
        // isLoading
        checked={props.cell.getValue() as boolean}
        id={props.row.id}
      ></Switch>
    ),
  },
];
