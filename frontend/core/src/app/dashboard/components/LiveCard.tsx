"use client";

import React, { useState } from "react";

import { useParams } from "next/navigation";

//components
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

//SVGs
import {
  CircleX,
  ConciergeBell,
  EllipsisVertical,
  Info,
  Pen,
  QrCode,
  Trash2,
} from "lucide-react";
import { TableChair } from "./svg";

// types
import { TableType } from "../[business_slug]/[branch_slug]/liveManagement/all/page";
import { cn } from "@/lib/utils";
import { CreateTableForm } from "./CreateTableForm";

// actions
import { deleteTable } from "@/app/actions";
import QrCodeGenerator from "@/components/global/QrCodeGenerator";

// types
type LiveCardType = {
  table: TableType;
  type?: "in-person" | "on-table" | "online";
  status?: "occupied" | "reserved" | "canceled";
  seats?: number;
  hasSession?: boolean;
};

export default function LiveCard({
  table,
  type,
  status,
  seats,
  hasSession,
}: LiveCardType) {
  const params = useParams<{ business_slug: string; branch_slug: string }>();

  const [showCode, setShowCode] = useState(false);

  return (
    <div
      className={cn(
        "border-[3px] min-h-[350px] font-normal w-60 transition-all duration-300 flex items-center flex-col rounded-[26px]",
        type === "online"
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-sky-blue"
      )}
    >
      <LiveCardBody>
        <LiveCardHeader
          setShowCode={setShowCode}
          branchSlug={params.branch_slug}
          table={table}
        ></LiveCardHeader>
        {showCode && (
          <div className="flex items-center justify-center w-full h-full">
            <QrCodeGenerator
              url={`http://localhost:3000/${params.business_slug}/menu?t=${table.code}`}
            ></QrCodeGenerator>
          </div>
        )}
      </LiveCardBody>
      <LiveCardFooter type={type}></LiveCardFooter>
    </div>
  );
}

export function LiveCardBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 bg-primary-foreground shadow-lg w-full rounded-3xl p-2 gap-2">
      {children}
    </div>
  );
}

export function LiveCardHeader({
  table,
  branchSlug,
  setShowCode,
}: {
  table: TableType;
  branchSlug: string;
  setShowCode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  async function handleTableDelete() {
    const res = await deleteTable(branchSlug, table.id);
    if (res.success) {
      toast.success("میز با موفقیت حذف شد");
    } else {
      toast.error("خطایی در هنگام حذف میز رخ داد");
    }
  }

  const handleViewQrCode = () => {
    setShowCode((prev) => !prev);
  };

  return (
    <div className="w-full flex justify-between items-center gap-1 rounded-full">
      <div className="flex gap-2">
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="rounded-full border-yellow-950/20 border hover:border-yellow-950 bg-soft-blue text-royal-green"
            >
              <EllipsisVertical></EllipsisVertical>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="rounded-xl w-44">
            <DropdownMenuLabel>{table.name}</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Info></Info>
                مشخصات میز
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewQrCode}>
                <QrCode></QrCode>
                مشاهده QR کد
              </DropdownMenuItem>
              <CreateTableForm
                branchSlug={branchSlug}
                defaultValues={table}
                tableId={table.id}
                title="ویرایش میز"
              >
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pen></Pen>
                  ویرایش میز
                </DropdownMenuItem>
              </CreateTableForm>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={(e) => e.preventDefault()}
                className="text-red-600 p-0 focus:text-red-600 focus:bg-red-50"
              >
                <AlertDialog>
                  <AlertDialogTrigger
                    asChild
                    className="w-full h-full flex items-center gap-2 py-1.5 px-2"
                  >
                    <div>
                      <Trash2></Trash2>
                      حذف میز
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        آیا مطمعنی که میخوای میز "{table.name}" رو حذف کنی؟
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        این عمل غیر قابل بازگشت میباشد
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8">
                      <AlertDialogCancel>انصراف</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          handleTableDelete();
                        }}
                      >
                        حذفش کن
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <CircleX></CircleX>
                لغو سفارش
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          size="icon"
          className="rounded-full border-yellow-950/20 border hover:border-yellow-950 bg-soft-blue text-royal-green"
        >
          <ConciergeBell></ConciergeBell>
        </Button>
      </div>
      <Button
        size="sm"
        className="rounded-full border-yellow-950/20 border hover:border-yellow-950 bg-soft-blue text-royal-green"
      >
        <p className="flex items-center text-xs justify-center text-center leading-none">
          {table.name}
        </p>
        <TableChair></TableChair>
      </Button>
    </div>
  );
}

export function LiveCardFooter({
  type,
}: {
  type?: "in-person" | "on-table" | "online";
}) {
  return (
    <div className="w-full flex justify-between items-center px-2 py-2 rounded-full">
      <p className=" font-semibold">سفارش روی میز</p>
      <div
        className={cn(
          "rounded-full bg-royal-green text-xs font-medium px-4 py-1 flex items-center",
          type === "online"
            ? "bg-primary-foreground text-primary"
            : "bg-sky-blue"
        )}
      >
        <p className="pt-0.5 font-semibold"> #312</p>
      </div>
    </div>
  );
}
