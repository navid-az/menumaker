"use client";

import React, { useEffect, useState } from "react";

import { motion } from "motion/react";

//components
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { CreateTableForm } from "./CreateTableForm";
import QrCodeGenerator from "@/components/global/QrCodeGenerator";
import { OrderDataDialog, OrderList } from "./OrderList";

//SVGs
import {
  ScrollText,
  Bell,
  CircleAlert,
  CircleX,
  EllipsisVertical,
  Info,
  Pen,
  QrCode,
  Trash2,
  User2,
  Users2,
} from "lucide-react";

//types
import { TableType } from "../[business_slug]/[branch_slug]/liveManagement/all/page";

//libraries
import { cn } from "@/lib/utils";
import { _Translator, useTranslations, useLocale } from "next-intl";

//utils
import { toPersianDigits } from "@/app/[locale]/(menu)/[business_slug]/utilities/formatCurrency";

//actions
import { updateOrder } from "@/app/actions/dashboard/live-management";
import { deleteTable } from "@/app/actions";

//hooks
import { progressType, useActiveTimer } from "@/app/hooks/useActiveTimer";
import { useDeferredNow } from "@/app/hooks/useDeferredNow";

//configs
import { APP_URL } from "@/lib/config";

// types
import { type UpdateOrder } from "@/app/types/payloads/menu";
type LiveCardType = {
  table: TableType;
  businessSlug: string;
  branchSlug: string;
  serviceType?: ServiceType;
  status?: "occupied" | "reserved" | "canceled" | "notice";
  seats?: number;
  hasSession?: boolean;
  isInView?: boolean
  isMockup?: boolean;
  className?: string
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
  serviceType,
  status = "notice",
  seats,
  hasSession,
  businessSlug,
  branchSlug,
  isInView,
  isMockup = false,
  className
}: LiveCardType) {
  const t = useTranslations('dashboard.liveManagement.liveCard')
  const locale = useLocale()

  const [showCode, setShowCode] = useState(false);
  const [state, setState] = useState<LiveCardState>("default");
  const [footerAlert, setFooterAlert] = useState(t('footer.status.session'));
  const [title, setTitle] = useState("مشاهده منو");
  const [showOrder, setShowOrder] = useState(false);

  const now = useDeferredNow()

  const activeSessionValid =
    now !== null &&
    table.active_session &&
    table.active_session?.is_active &&
    new Date(table.active_session.expires_at) > new Date(now)

  const {
    progress,
    remainingDuration,
    elapsedDuration,
    progressType,
    progressMessage,
    isReady
  } = useActiveTimer(table, isInView);

  useEffect(() => {
    if (progressType) {
      if (progressType === "call") {
        setState("attention");
        setShowOrder(false);
        setTitle(t('status.waiter'));
      }
      if (progressType === "pendingOrder") {
        setState("attention");
        setTitle(t('status.newOrder'));

        const timeoutId = setTimeout(() => {
          setShowOrder(true);
          setState("default");
          setTitle(t('status.activeOrder'));
        }, 5000);

        return () => {
          clearTimeout(timeoutId);
        };
      }
      if (progressType === "readyOrder") {
        setShowOrder(false);
        setState("attention");
        setTitle(t('status.orderReady'));
      }
      if (progressType === "servedOrder") {
        setState("success");
        setTitle("سرو شد!");
        setFooterAlert(t('status.orderServed'));
      }
      if (progressType === "session") {
        setState("default");
        setTitle(t('status.viewingMenu'));
      }
      if (progressType === "none") {
        setState("disabled");
      }
    } else {
      setState("default");
      setTitle("");
    }
  }, [progressType]);

  async function handleUpdateOrder() {
    if (!table.order?.id) return;

    let data: Partial<UpdateOrder> = {};

    if (progressType === "pendingOrder") {
      data = {
        status: "ready",
        ready_at: new Date().toISOString(),
      };
    } else if (progressType === "readyOrder") {
      data = {
        status: "served",
        served_at: new Date().toISOString(),
      };
    }

    if (Object.keys(data).length === 0) {
      console.warn("No changes to send");
      return;
    }

    const res = await updateOrder(table.order.id, data);

    if (!res.success) {
      toast.error("خطایی در انجام عملیات رخ داد، لطفا مجددا امتحان کنید");
    }
  }

  return (
    <div
      style={stateColors[state]}
      className={cn(
        "relative border-[3px] h-max overflow-clip border-(--livecard-primary) bg-(--livecard-primary) text-(--livecard-accent) min-h-[350px] font-normal w-60 transition-all duration-300 justify-end flex items-center flex-col rounded-[26px]", className
      )}
    >
      <LiveCardBody activeSessionValid={!!activeSessionValid} table={table}>
        <LiveCardHeader
          setShowCode={setShowCode}
          businessSlug={businessSlug}
          branchSlug={branchSlug}
          table={table}
          orderAge={progress}
          elapsedDuration={elapsedDuration}
          progressType={progressType}
          isMockup={isMockup}
          locale={locale}
          t={t}
        ></LiveCardHeader>
        {showCode ? (
          <QRCodeView
            {...(!isMockup && {
              businessSlug,
              branchSlug,
              tableCode: table.code,
            })}
            isMockup={isMockup}
          ></QRCodeView>
        ) : activeSessionValid ? (
          <motion.div
            className={cn(
              "flex flex-col w-full justify-center h-full items-center",
              showOrder ? "justify-start pt-2 gap-0" : "justify-center gap-4"
            )}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ width: "180px", height: "180px" }}
              animate={
                showOrder
                  ? { width: "80px", height: "80px", marginTop: "-56px" }
                  : { width: "180px", height: "180px" }
              }
              transition={{
                ease: "easeOut",
              }}
              className="group flex relative justify-center items-center rounded-full"
            >
              <div
                className={cn(
                  "flex absolute w-full px-6 left-1/2 top-1/2 transition-all duration-100 -translate-x-1/2 -translate-y-1/2 gap-2 flex-col items-center justify-center text-2xl font-semibold mx-auto text-(--livecard-text)"
                )}
              >
                {/* central progress text  */}
                {title && !showOrder && (
                  <p className="block w-full text-center text-xl line-clamp-2 group-hover:hidden">
                    {title}
                  </p>
                )}
                <p
                  className={cn(
                    "font-normal transition-all duration-300",
                    showOrder
                      ? "text-lg block"
                      : "text-2xl hidden group-hover:block"
                  )}
                >
                  {progressType === "call" || progressType === "session"
                    ? remainingDuration
                    : elapsedDuration}
                </p>
              </div>
              {(progressType === "readyOrder" ||
                progressType === "pendingOrder") && (
                  <Button
                    onClick={handleUpdateOrder}
                    className="left-1/2 hidden group-hover:flex top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-100 absolute size-[76%] font-semibold rounded-full bg-green-300 text-green-950"
                  >
                    <p
                      className={cn(
                        "font-semibold transition-all duration-300",
                        showOrder ? "text-sm" : "text-2xl"
                      )}
                    >
                      تکمیل
                    </p>
                  </Button>
                )}
              {/* <p className="absolute top-0 text-red-600">{progressType}</p> */}
              <ProgressBar
                outerColor="var(--livecard-secondary)"
                innerColor="var(--livecard-primary)"
                size={"100%"}
                progress={progress}
              ></ProgressBar>
            </motion.div>
            {showOrder ? (
              <OrderList table={table}></OrderList>
            ) : (
              <div className={cn("flex gap-1.5 transition-all duration-300 items-center")}>
                <CircleAlert className="size-3.5 text-(--livecard-text)"></CircleAlert>
                <p className={cn("text-xs text-(--livecard-text)")}>
                  {progressMessage}
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <EmptyView table={table} t={t}></EmptyView>
        )}
      </LiveCardBody>

      <LiveCardFooter
        table={table}
        footerAlert={footerAlert}
        setFooterAlert={setFooterAlert}
        progressType={progressType}
        isReady={isReady}
        serviceType={serviceType}
        t={t}
      ></LiveCardFooter>
    </div>
  );
}

function EmptyView({ table, t }: { table: TableType, t: _Translator<Record<string, any>, "dashboard.liveManagement.liveCard"> }) {
  return (
    <div className="flex justify-center items-center flex-col h-full gap-2 mb-10">
      <p className="text-primary text-2xl font-bold text-center">
        {t("timer.emptyTable.title", { tableName: table.name })}
      </p>
      <p className="text-secondary-foreground text-sm text-center justify-self-center">
        {t('timer.emptyTable.description')}
      </p>
    </div>
  );
}

function QRCodeView({
  businessSlug,
  branchSlug,
  tableCode,
  isMockup = false
}: {
  businessSlug?: string;
  branchSlug?: string;
  tableCode?: string;
  isMockup?: boolean
}) {
  const URL = businessSlug && branchSlug && tableCode ? `${APP_URL}/${businessSlug}/menu?branch=${branchSlug}&t=${tableCode}` : APP_URL

  return (
    <div className="flex items-center justify-center w-full h-full">
      <QrCodeGenerator
        isMockup={isMockup}
        url={URL}
      ></QrCodeGenerator>
    </div>
  );
}

export function LiveCardBody({
  table,
  children,
  activeSessionValid,
}: {
  table: TableType;
  children: React.ReactNode;
  activeSessionValid: boolean;
}) {
  return (
    <div
      className={cn(
        "flex absolute z-10 top-0 items-center overflow-hidden gap-2 flex-col justify-between flex-1 transition-all duration-300 bg-primary-foreground shadow-lg w-full rounded-3xl p-2",
        activeSessionValid ? "bottom-10" : "bottom-0"
      )}
    >
      {children}
    </div>
  );
}

export function LiveCardHeader({
  table,
  businessSlug,
  branchSlug,
  setShowCode,
  elapsedDuration,
  progressType,
  isMockup = false,
  t,
  locale
}: {
  table: TableType;
  businessSlug: string;
  branchSlug: string;
  setShowCode: React.Dispatch<React.SetStateAction<boolean>>;
  orderAge: number;
  elapsedDuration: string;
  progressType: progressType;
  isMockup?: boolean;
  t: _Translator<Record<string, any>, "dashboard.liveManagement.liveCard">
  locale: string
}) {
  async function handleTableDelete() {
    const res = await deleteTable(businessSlug, branchSlug, table.id);
    if (res.success) {
      toast.success(t('header.toasts.deleteSuccess'));
    } else {
      toast.error(t('header.toasts.deleteError'));
    }
  }

  const handleViewQrCode = () => {
    setShowCode((prev) => !prev);
  };

  return (
    <div className="relative w-full flex justify-between items-center rounded-full">
      <div dir="ltr" className="flex justify-between w-full transition-all duration-300">
        <div className="flex justify-between gap-2">
          <Button
            size="icon"
            className="relative rounded-full border-(--livecard-primary)/20 border hover:border-(--livecard-primary) hover:bg-(--livecard-primary)/5 bg-inherit text-royal-green"
          >
            <Bell className="z-10"></Bell>
            {/* <span className="absolute -bottom-0.5 -right-0.5 min-w-[1rem] h-[1rem] rounded-full pt-0.5 bg-red-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white">
              3
            </span> */}
          </Button>
          {/* <Button
            size="icon"
            className={cn(
              "rounded-full w-14 transition-all duration-300 bg-(--livecard-secondary)",
              true ? "opacity-0 -ml-[64px]" : "opacity-100 ml-0"
            )}
          >
            <User2 className="text-(--livecard-primary)"></User2>
          </Button> */}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="rounded-full border-(--livecard-primary)/20 border hover:border-(--livecard-primary) text-royal-green bg-inherit hover:bg-(--livecard-primary)/5"
            >
              <EllipsisVertical></EllipsisVertical>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={locale === 'fa' ? 'start' : "end"} className="rounded-xl w-44">
            <DropdownMenuLabel className="flex justify-between items-center border-b border-primary/5">
              <p className="text-medium">{table.name}</p>
              <div className="flex gap-2 bg-primary text-secondary rounded-full px-2 py-1 items-center">
                <Users2 className="size-4"></Users2>
                <p className="font-normal">{locale === 'fa' ? toPersianDigits(table.seats) : table.seats}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem disabled={isMockup}>
                <Info></Info>
                {t('header.dropdown.buttons.tableDetails')}
              </DropdownMenuItem>
              <OrderDataDialog table={table}>
                <DropdownMenuItem
                  disabled={!table.order || progressType === "none"}
                  onSelect={(e) => e.preventDefault()}
                >
                  <ScrollText></ScrollText>
                  {t('header.dropdown.buttons.orderDetails')}
                </DropdownMenuItem>
              </OrderDataDialog>

              <DropdownMenuItem onClick={handleViewQrCode}>
                <QrCode></QrCode>
                {t('header.dropdown.buttons.viewQrCode')}
              </DropdownMenuItem>
              {isMockup ? (
                <DropdownMenuItem disabled>
                  <Pen></Pen>
                  {t('header.dropdown.buttons.editTable')}
                </DropdownMenuItem>
              ) : (
                <CreateTableForm
                  businessSlug={businessSlug}
                  branchSlug={branchSlug}
                  defaultValues={table}
                  tableId={table.id}
                  title={t('header.dropdown.buttons.editTable')}
                >
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Pen></Pen>
                    {t('header.dropdown.buttons.editTable')}
                  </DropdownMenuItem>
                </CreateTableForm>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                disabled={isMockup}
                onClick={(e) => e.preventDefault()}
                className="text-red-600 p-0 focus:text-red-600 focus:bg-red-50"
              >
                <AlertDialog>
                  <AlertDialogTrigger
                    asChild
                    className="w-full h-full flex items-center gap-2 py-1.5 px-2"
                  >
                    <div>
                      <Trash2 className="text-red-600 "></Trash2>
                      {t('header.dropdown.buttons.deleteTable')}
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {t('header.dropdown.deleteConfirmation.title', { name: table.name })}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {t('header.dropdown.deleteConfirmation.description')}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8">
                      <AlertDialogCancel>
                        {t('header.dropdown.deleteConfirmation.cancel')}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="hover:bg-red-600 transition-all duration-300"
                        onClick={(e) => {
                          handleTableDelete();
                        }}
                      >
                        {t('header.dropdown.deleteConfirmation.confirm')}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <CircleX className="text-red-600 "></CircleX>
                {t('header.dropdown.buttons.cancelOrder')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* transaction success message */}
      {/* {successfulTransaction && (
        <div className="w-full h-full absolute flex justify-center z-20">
          <Button className="rounded-full justify-center bg-green-950 text-green-200 group">
            <BadgeCheck className="w-6 h-6"></BadgeCheck>
            <p
              className={cn(
                "text-xs font-medium transition-all duration-300 -ml-[73px] opacity-0 group-hover:ml-0 group-hover:opacity-100"
              )}
            >
              پرداخت موفق
            </p>
          </Button>
        </div>
      )} */}
    </div>
  );
}

type TextState = "initial" | "loading" | "final";

export function LiveCardFooter({
  table,
  footerAlert,
  setFooterAlert,
  progressType,
  isReady,
  serviceType,
  t
}: {
  table: TableType;
  footerAlert: string;
  setFooterAlert: React.Dispatch<React.SetStateAction<string>>;
  progressType: progressType;
  isReady: boolean;
  serviceType?: ServiceType;
  t: _Translator<Record<string, any>, "dashboard.liveManagement.liveCard">
}) {
  // What should be shown right now according to props/state
  const getTargetText = (): string => {
    switch (progressType) {
      case "pendingOrder":
        return t('footer.status.pendingOrder');
      case "session":
        return t('footer.status.session');
      case "call":
        return t('footer.status.call');
      case "readyOrder":
        return t('footer.status.readyOrder');
      case "servedOrder":
        return t('footer.status.servedOrder');
      default:
        return t('footer.status.default');
    }
  };

  const [isBlurred, setIsBlurred] = useState(false);

  // Whenever progressType changes → check if text should update
  useEffect(() => {
    if (!isReady) return; // skip the phantom pre-hydration pass entirely

    const target = getTargetText();

    // Only animate if the text actually needs to change
    if (target !== footerAlert) {
      setIsBlurred(true);

      const timer = setTimeout(() => {
        setFooterAlert(target);
        setIsBlurred(false);
      }, 600); // stay blurred ~1.8s → feels like ~2s total with fade-in/out

      return () => clearTimeout(timer);
    }
  }, [progressType, footerAlert]);

  return (
    <div className="h-10 w-full flex justify-between items-center px-2 py-2 rounded-full">
      {/* <p className="font-semibold blur-2xl">{footerAlert}</p> */}
      <motion.p
        animate={{
          filter: isBlurred ? "blur(40px)" : "blur(0px)",
          opacity: isBlurred ? 0.3 : 1,
        }}
        exit="blurred"
        transition={{
          duration: isBlurred ? 0.45 : 0.65,
          ease: isBlurred ? "easeIn" : "easeOut",
        }}
        className="font-semibold blur-2xl"
      >
        {footerAlert}
      </motion.p>
      <div
        className={cn(
          "rounded-full font-sans bg-(--livecard-accent) text-(--livecard-primary) h-full text-xs px-2 flex items-center hover:scale-105 duration-300 transition-all scale-pro cursor-pointer"
          // type != "in-person"
          //   ? "bg-primary-foreground text-primary"
          //   : "bg-dark-brown text-happy-yellow"
        )}
      >
        <p className="font-medium">{table.active_session?.code}#</p>
      </div>
    </div>
  );
}
