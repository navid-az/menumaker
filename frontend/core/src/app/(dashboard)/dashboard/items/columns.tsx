"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Items = {
  id: string;
  image: string;
  name: string;
  price: number;
  is_available: boolean;
  is_active: boolean;
};

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
    accessorKey: "is available",
    header: "موجود",
  },
  {
    accessorKey: "is active",
    header: "فعال",
  },
];
