"use client";

import React, { useEffect, useState } from "react";

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
import ProgressBar from "./ProgressBar";

//SVGs
import {
  Bell,
  CircleAlert,
  CircleX,
  ConciergeBell,
  EllipsisVertical,
  Info,
  Pen,
  QrCode,
  Trash2,
  User2,
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
  businessSlug: string;
  branchSlug: string;
  type?: ServiceType;
  status?: "occupied" | "reserved" | "canceled" | "notice";
  seats?: number;
  hasSession?: boolean;
};
type ServiceType = "in-person" | "on-table" | "online";
type LiveCardState =
  | "default"
  | "online"
  | "success"
  | "warning"
  | "attention"
  | "disabled";

const stateColors: Record<LiveCardState, Record<string, string>> = {
  default: {
    "--livecard-primary": "#0F2C30", // green
    "--livecard-secondary": "#EBEBEB", // gray
    "--livecard-accent": "#EDFDFF", // soft-blue
    "--livecard-text": "#0F2C30", // green
  },
  online: {
    "--livecard-primary": "#5263FF", // green
    "--livecard-secondary": "#EBEBEB", // dark green
    "--livecard-accent": "#EDFDFF", // dark green
    "--livecard-text": "#5263FF", // dark green
  },
  success: {
    "--livecard-primary": "#A1FCB5", // green
    "--livecard-secondary": "#0F2C30", // dark green
    "--livecard-accent": "#0F2C30", // dark green
    "--livecard-text": "#0F2C30", // dark green
  },
  warning: {
    "--livecard-primary": "#FF876D", // red
    "--livecard-secondary": "#1f0e0b", // brown
    "--livecard-accent": "#1f0e0b", // brown
    "--livecard-text": "#1f0e0b", // brown
  },
  attention: {
    "--livecard-primary": "#EEE486",
    "--livecard-secondary": "#1f0e0b", // brown
    "--livecard-accent": "#1f0e0b", // brown
    "--livecard-text": "#1f0e0b", // brown
  },
  disabled: {
    "--livecard-primary": "#D0D0D0", // gray
    "--livecard-secondary": "#303030", // dark gray
    "--livecard-accent": "#303030", // dark gray
    "--livecard-text": "#303030", // dark gray
  },
};

export default function LiveCard({
  table,
  type,
  status = "notice",
  seats,
  hasSession,
  businessSlug,
  branchSlug,
}: LiveCardType) {
  const [showCode, setShowCode] = useState(false);
  const [state, setState] = useState<LiveCardState>("default");
  const [ServiceType, setServiceType] = useState<ServiceType | undefined>();
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const now = new Date();

  const activeCallValid =
    table.active_call &&
    !table.active_call.resolved &&
    new Date(table.active_call.expires_at) > now;

  useEffect(() => {
    if (table.active_session?.code) {
      setProgress(0);
      setTitle("مشاهده منو");
      if (activeCallValid) {
        setState("attention");
        setTitle("سالن دار!");
      }
    }
  }, [activeCallValid, table.active_session?.code]);

  return (
    <div
      style={stateColors[state]}
      className={cn(
        "relative border-[3px] overflow-clip border-(--livecard-primary) bg-(--livecard-primary) text-(--livecard-accent) min-h-[350px] font-normal w-60 transition-all duration-300 justify-end flex items-center flex-col rounded-[26px]"
        // activeCallValid
        //   ? "border-happy-yellow bg-happy-yellow text-dark-brown"
        //   : "border-royal-green bg-royal-green text-soft-blue"
      )}
    >
      <LiveCardBody table={table}>
        <LiveCardHeader
          setShowCode={setShowCode}
          branchSlug={branchSlug}
          table={table}
        ></LiveCardHeader>
        {showCode ? (
          <div className="flex items-center justify-center w-full h-full">
            <QrCodeGenerator
              url={`http://localhost:3000/${businessSlug}/menu?t=${table.code}`}
            ></QrCodeGenerator>
          </div>
        ) : table.active_session ? (
          <div className="flex flex-col justify-center h-full items-center gap-4">
            <div className="relative flex flex-col justify-center items-center">
              {table.active_session?.code && (
                <>
                  <p
                    className={cn(
                      "absolute text-2xl font-semibold mx-auto text-(--livecard-text)"
                      // activeCallValid ? "text-dark-brown" : "text-royal-green"
                    )}
                  >
                    {title}
                  </p>
                  <ProgressBar
                    outerColor="var(--livecard-secondary)"
                    innerColor="var(--livecard-primary)"
                    size={190}
                    progress={progress}
                  ></ProgressBar>
                </>
              )}
            </div>
            <div
              className={cn(
                "flex gap-1 transition-all duration-300",
                activeCallValid ? "opacity-100 mb-0" : "opacity-0 -mb-8"
              )}
            >
              <CircleAlert className="w-4 h-4 text-(--livecard-text)"></CircleAlert>
              <p className={cn("text-xs text-(--livecard-text)")}>
                مشتری ۲ دقیقه پیش صدا زده
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col h-full gap-2 mb-10">
            <p className="text-primary text-2xl font-bold text-center">
              {table.name} خالی میباشد
            </p>
            <p className="text-secondary-foreground text-sm text-center justify-self-center">
              به محض باز شدن منو توسط مشتری کارت فعال میشود
            </p>
          </div>
        )}
      </LiveCardBody>
      <LiveCardFooter table={table} type={type}></LiveCardFooter>
    </div>
  );
}

export function LiveCardBody({
  table,
  children,
}: {
  table: TableType;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex absolute z-10 top-0 items-center gap-2 flex-col justify-between flex-1 transition-all duration-300 bg-primary-foreground shadow-lg w-full rounded-3xl p-2",
        table.active_session?.code ? "bottom-10" : "bottom-0"
      )}
    >
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
      <div className="flex justify-between w-full gap-2">
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="rounded-full border-(--livecard-primary)/20 border hover:border-(--livecard-primary) text-royal-green bg-inherit hover:bg-(--livecard-primary)/5"
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
        <div className="flex justify-between gap-2">
          <Button
            size="icon"
            className="rounded-full border-yellow-950/20 border hover:border-yellow-950 bg-inherit hover:bg-royal-green/5 text-royal-green"
          >
            <Bell></Bell>
          </Button>
          <Button
            size="icon"
            className={cn(
              "rounded-full w-13 transition-all duration-300 bg-(--livecard-secondary)",
              false ? "opacity-0 -ml-[60px]" : "opacity-100 ml-0"
            )}
          >
            <User2 className="text-(--livecard-primary)"></User2>
          </Button>
        </div>
      </div>
      {/* <Button
        size="sm"
        className="rounded-full border-yellow-950/20 border hover:border-yellow-950 bg-inherit hover:bg-royal-green/5 text-royal-green"
      >
        <p className="flex items-center text-xs justify-center text-center leading-none">
          {table.name}
        </p>
        <TableChair></TableChair>
      </Button> */}
    </div>
  );
}

export function LiveCardFooter({
  table,
  type,
}: {
  table: TableType;
  type?: "in-person" | "on-table" | "online";
}) {
  return (
    <div className="h-10 w-full flex justify-between items-center px-2 py-2 rounded-full">
      <p className="font-semibold">سفارش روی میز</p>
      <div
        className={cn(
          "rounded-full bg-(--livecard-accent) text-(--livecard-primary) h-full text-xs px-2 flex items-center hover:scale-105 duration-300 transition-all scale-pro cursor-pointer"
          // type != "in-person"
          //   ? "bg-primary-foreground text-primary"
          //   : "bg-dark-brown text-happy-yellow"
        )}
      >
        <p className="font-medium">{table.active_session?.code}</p>
        <p className="font-medium">#</p>
      </div>
    </div>
  );
}
