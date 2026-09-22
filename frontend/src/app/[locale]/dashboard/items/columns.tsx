"use client";

//components
import Image from "next/image";
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
import { toast } from "sonner";
import { CreateItemForm } from "../components/CreateItemForm";
import ItemTableSwitch from "../components/ItemTableSwitch";

//actions
import { deleteItem } from "@/app/actions";

//SVGs
import { ArrowUpDown, Trash2, ImageIcon } from "lucide-react";

//libraries
import { ColumnDef } from "@tanstack/react-table";
import { CellContext } from "@tanstack/react-table";

//types
import { MenuCategory } from "@/app/types/api/menu";
import { MenuItem } from "@/app/types/api/menu";
import { _Translator } from "next-intl";

const handleDelete = async (props: CellContext<MenuItem, unknown>, successMessage: string, errorMessage: string) => {
  const res = await deleteItem(
    props.row.original.business,
    props.row.original.id
  );
  if (res.success) {
    toast.success(successMessage);
  } else {
    toast.error(errorMessage);
  }
};

export const itemColumns = (
  businessSlug: string,
  categories: MenuCategory[],
  scope: "visible" | "hidden",
  t: _Translator<Record<string, any>, "dashboard.data.items">
): ColumnDef<MenuItem>[] => [
    {
      accessorKey: "item_images",
      header: t('dataTable.headers.image'),
      cell: ({ row }) => {
        const image = row.original.item_images?.[0];

        return (
          <div className="relative h-12 w-12 rounded-md">
            {image ? (
              <Image
                className="rounded-md"
                fill
                alt={row.original.name}
                src={image.url}
              />
            ) : (
              <ImageIcon strokeWidth={1.5} className="h-12 w-12 text-gray-400" />
            )}
          </div>
        );
      },
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
            {t('dataTable.headers.name')}
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "category",
      header: t('dataTable.headers.category'),
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
            {t('dataTable.headers.price')}
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "branch_exceptions.is_available",
      header: t('dataTable.headers.isAvailable'),
      cell: (props) => {
        const branchExceptions = props.row.original.branch_exceptions;
        const value = branchExceptions
          ? branchExceptions.is_available
          : scope === "visible"
            ? true
            : false;

        return (
          <ItemTableSwitch
            initial={value}
            row={props.row}
            fieldName="is_available"
          ></ItemTableSwitch>
        );
      },
    },
    {
      accessorKey: "branch_exceptions.is_active",
      header: t('dataTable.headers.isActive'),
      cell: (props) => {
        const branchExceptions = props.row.original.branch_exceptions;
        const value = branchExceptions
          ? branchExceptions.is_active
          : scope === "visible"
            ? true
            : false;

        return (
          <ItemTableSwitch
            initial={value}
            row={props.row}
            fieldName="is_active"
          ></ItemTableSwitch>
        );
      },
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
                <AlertDialogTitle>{t('dataTable.deleteConfirmation.title', { "name": props.row.getValue("name") })}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('dataTable.deleteConfirmation.description')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('dataTable.deleteConfirmation.cancel')}</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    onClick={() => handleDelete(props, t('dataTable.toasts.deleteSuccess'), t('dataTable.toasts.deleteError'))}
                    variant="destructive"
                  >
                    {t('dataTable.deleteConfirmation.confirm')}
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <CreateItemForm
            businessSlug={props.row.original.business}
            title={t('form.update.title')}
            description={t('form.update.description')}
            defaultValues={props.row.original}
            categories={categories}
            itemId={props.row.original.id}
          />
        </div>
      ),
    },
  ];
