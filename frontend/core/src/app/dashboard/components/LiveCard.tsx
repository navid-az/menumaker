"use client";

import React from "react";

//components
import { Button } from "@/components/ui/button";

//SVGs
import { ConciergeBell, EllipsisVertical } from "lucide-react";
import { TableChair } from "./svg";

//types
import { TableType } from "../[business_slug]/[branch_slug]/liveManagement/all/page";
import { cn } from "@/lib/utils";

//types
type LiveCardType = {
  table: TableType;
  type?: "in-person" | "on-table" | "online";
  status?: "occupied" | "reserved" | "canceled";
  seats?: number;
  hasSession?: boolean;
};
const styles = {
  type: { online: "#5263FF", inPerson: "sky-blue", onTable: "sky-blue" },
};

export default function LiveCard({
  table,
  type,
  status,
  seats,
  hasSession,
}: LiveCardType) {
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
        <LiveCardHeader table={table}></LiveCardHeader>
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

export function LiveCardHeader({ table }: { table: TableType }) {
  return (
    <div className="w-full flex justify-between items-center gap-1 p-1 rounded-full">
      <div className="flex gap-2">
        <Button
          size="icon"
          className="rounded-full border-yellow-950/20 border hover:border-yellow-950 bg-soft-blue text-royal-green"
        >
          <EllipsisVertical></EllipsisVertical>
        </Button>
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
// #EEE486
