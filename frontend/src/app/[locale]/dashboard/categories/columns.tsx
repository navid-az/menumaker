//libraries
import { ColumnDef } from "@tanstack/react-table";
import { CellContext } from "@tanstack/react-table";

//components
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import CategoryTableSwitch from "../components/data-table/CategoryTableSwitch";
import { CreateCategoryForm } from "../components/CreateCategoryForm";

//actions
import { deleteCategory } from "@/app/actions";

//SVGs
import {
  ArrowUpDown,
  Edit2,
  ImageIcon,
  MoreVertical,
  Trash2,
} from "lucide-react";

import { AssetGroupType } from "@/components/global/AssetPicker";

//types
import { MenuCategory } from "@/app/types/api/menu";
import { _Translator } from "next-intl";

const handleDelete = async (props: CellContext<MenuCategory, unknown>, successMessage: string, errorMessage: string) => {
  const res = await deleteCategory(
    props.row.original.business,
    props.row.original.id
  );
  if (res.success) {
    toast.success(successMessage);
  } else {
    toast.error(errorMessage);
  }
};

export const categoryColumns = (
  assetGroups: AssetGroupType[],
  t: _Translator<Record<string, any>, "dashboard.data.items">
): ColumnDef<MenuCategory>[] => [
    {
      accessorKey: "icon",
      header: t('dataTable.headers.icon'),
      cell: (props) => (
        <div className="relative h-12 w-12 rounded-md">
          {props.row.original.icon ? (
            <Image
              className="rounded-md"
              fill
              alt={props.row.original.icon?.name ?? 'item image'}
              src={props.row.original.icon?.url}
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
            {t('dataTable.headers.name')}
          </Button>
        );
      },
    },
    {
      accessorKey: "is_active",
      header: t('dataTable.headers.isActive'),
      cell: ({ row, cell }) => (
        <CategoryTableSwitch
          originalValue={cell.getValue() as boolean}
          businessSlug={row.original.business}
          categoryId={row.original.id}
          rowId={row.id}
        />
      ),
    },
    {
      id: "row-options",
      cell: (props) => {
        return (
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
            <CreateCategoryForm
              businessSlug={props.row.original.business}
              assetGroups={assetGroups}
              title={t('form.update.title')}
              description={t('form.update.description')}
              defaultValues={{
                name: props.row.original.name,
                icon: props.row.original.icon,
              }}
              categoryId={props.row.original.id}
            />
          </div>
        );
      },
    },
  ];
