"use client";

import React from "react";

import { useParams } from "next/navigation";

//components
import { Button } from "@/components/ui/button";
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

//types
import { TableType } from "../[business_slug]/[branch_slug]/liveManagement/all/page";
import { cn } from "@/lib/utils";
import { CreateTableForm } from "./CreateTableForm";

//types
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

  return (
    <div
      className={cn(
        "border-[3px] font-normal w-60 h-[346px] transition-all duration-300 flex items-center flex-col justify-center rounded-[26px]",
        type === "online"
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-sky-blue"
      )}
    >
      <LiveCardBody>
        <LiveCardHeader
          branchSlug={params.branch_slug}
          table={table}
        ></LiveCardHeader>
      </LiveCardBody>
      <LiveCardFooter type={type}></LiveCardFooter>
    </div>
  );
}

export function LiveCardBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex-1 bg-primary-foreground shadow-lg w-full rounded-3xl p-1">
      {children}
    </div>
  );
}

export function LiveCardHeader({
  table,
  branchSlug,
}: {
  table: TableType;
  branchSlug: string;
}) {
  return (
    <div className="w-full flex justify-between items-center gap-1 p-1 rounded-full">
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
              <DropdownMenuItem>
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
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                <Trash2></Trash2>
                حذف میز
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
    <div className="w-full border-1 flex justify-between items-center border-primary px-2 py-2 rounded-full">
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
