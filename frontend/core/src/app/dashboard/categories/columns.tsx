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

const handleDelete = async (props: CellContext<MenuCategory, unknown>) => {
  const res = await deleteCategory(
    props.row.original.business,
    props.row.original.id
  );
  if (res.success) {
    toast.success("دسته بندی با موفقیت حذف شد");
  } else {
    toast.error(res.error);
  }
};

export const categoryColumns = (
  assetGroups: AssetGroupType[]
): ColumnDef<MenuCategory>[] => [
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
            src={`http://127.0.0.1:8000${props.row.original.icon?.image}`}
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
          نام
        </Button>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "فعال",
    cell: ({ row, cell }) => (
      <CategoryTableSwitch
        originalValue={cell.getValue() as boolean}
        business={row.original.business}
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
                <AlertDialogTitle>مطمعنی؟</AlertDialogTitle>
                <AlertDialogDescription>
                  آیا از حذف این دسته بندی({props.row.getValue("name")}) مطمعنی؟
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
          <CreateCategoryForm
            businessSlug={props.row.original.business}
            assetGroups={assetGroups}
            title="ویرایش دسته بندی"
            description="با تغییر موارد زیر دسته بندی را ویرایش کنید"
            defaultValues={{
              name: props.row.original.name,
              icon: props.row.original.icon || undefined,
            }}
            categoryId={props.row.original.id}
          />
        </div>
      );
    },
  },
];
