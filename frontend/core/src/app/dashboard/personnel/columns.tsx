"use client";

//libraries
import { ColumnDef } from "@tanstack/react-table";

//components
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
import { toast } from "sonner";
import { RoleBadge } from "../[business_slug]/[branch_slug]/personnel/all/components/RoleBadge";

//SVGs
import { Trash2 } from "lucide-react";
import { BranchCell } from "../[business_slug]/[branch_slug]/personnel/all/components/BranchCell";

//actions
import { deletePersonnel } from "@/app/actions/dashboard/personnel";

//types
export type Personnel = {
  user: string;
  role: string;
  branches: number[];
  is_active: boolean;
  is_owner: boolean;
};

const handleDelete = async (props: any) => {
  const business_slug = props.table.options.meta?.business_slug;
  const personnel_id = props.row.original.id;
  const res = await deletePersonnel(business_slug, personnel_id);
  if (res.success) {
    toast.success(res.detail);
  } else {
    toast.error(res.detail);
  }
};

export const personnelColumns = (
  business_slug: string
): ColumnDef<Personnel>[] => [
  {
    accessorKey: "user",
    header: "پرسنل",
    cell: ({ row }) => <div className="capitalize">{row.getValue("user")}</div>,
  },
  {
    accessorKey: "role",
    header: "سمت",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return <RoleBadge role={role} />;
    },
  },
  {
    accessorKey: "branches",
    header: "شعب",
    cell: ({ row }) => (
      <BranchCell branches={row.getValue("branches")}></BranchCell>
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
                  آیا از حذف پرسنل ({props.row.getValue("user")}) مطمعنی؟
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
        </div>
      );
    },
  },
];
