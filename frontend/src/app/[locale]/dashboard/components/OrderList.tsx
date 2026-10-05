'use client'

import React from "react";

//components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

//libraries
import { useTranslations } from "next-intl";

//hooks
import { useProgress } from "@/app/hooks/useProgress";

//types
import { type Table } from "@/app/types/api/business";
import {
  addCommas,
  toPersianDigits,
} from "@/app/[locale]/(menu)/[business_slug]/utilities/formatCurrency";
import { OrderItem } from "@/app/types/api/menu";
import { cn } from "@/lib/utils";

export function OrderList({ table }: { table: Table }) {
  const t = useTranslations('dashboard.liveManagement.liveCard.orderList')
  //calculate order created_at progress

  return (
    <div className="relative w-full h-full">
      <div className="w-full flex p-2">
        <p className="text-primary">{t("title")}</p>
      </div>
      <ul>
        {table.order?.items.slice(0, 3).map((orderItem) => (
          <ItemRow key={orderItem.id} item={orderItem}></ItemRow>
        ))}
      </ul>
      {table.order && table.order?.items.length > 3 && (
        <OrderDataDialog table={table}>
          <Button
            size="lg"
            className="scale-pro w-full text-primary bg-gray-100 border-2 border-primary/40 hover:scale-95 hover:bg-primary hover:text-white justify-center text-base rounded-b-3xl transition-all duration-200"
          >
            <div className="flex items-end gap-0.5 pt-0.5">
              <span className="font-normal">+</span>
              <p className=" font-normal">
                {toPersianDigits(table.order.items.length - 3)}
              </p>
            </div>
            <p className="font-normal">آیتم</p>
          </Button>
        </OrderDataDialog>
      )}
      {/* <Button className="bg-soft-blue opacity-0 select-none group-hover:opacity-100 group-hover:border-royal-green/50 hover:border-green-950 hover:bg-green-300 hover:text-green-950 text-royal-green border-2 border-sad-blue text-base w-full absolute bottom-0 rounded-full">{t('buttons.ready')}</Button> */}

    </div>
  );
}

function ItemRow({
  item,
  lastDashed = true,
}: {
  item: OrderItem;
  lastDashed?: boolean;
}) {
  return (
    <li
      className={cn(
        "flex items-center w-full gap-2 p-2 border-b-1 border-primary/10",
        lastDashed && "last:border-dashed last:border-b-2"
      )}
    >
      <div className="flex items-end gap-0.5">
        <span className="text-primary">x</span>
        <p className="text-primary font-medium">
          {toPersianDigits(item.quantity)}
        </p>
      </div>
      <p className="text-primary font-medium">{item.name_snapshot}</p>
    </li>
  );
}

export function OrderDataDialog({
  children,
  table,
}: {
  children: React.ReactNode;
  table: Table;
}) {
  //calculate order created_at progress
  const { elapsedMs: elapsedOrderDuration } = useProgress(
    table.order?.created_at || "",
    "",
    false,
    "countup"
  );

  const t = useTranslations('dashboard.liveManagement.liveCard.orderList')

  const orderStatus = {
    pending: {
      text: t("orderStatuses.pending"),
      color: "text-yellow-500",
    },
    accepted: {
      text: t("orderStatuses.accepted"),
      color: "text-green-500",
    },
    preparing: {
      text: t("orderStatuses.preparing"),
      color: "text-orange-500",
    },
    ready: {
      text: t("orderStatuses.ready"),
      color: "text-blue-500",
    },
    served: {
      text: t("orderStatuses.served"),
      color: "text-green-500",
    },
    cancelled: {
      text: t("orderStatuses.cancelled"),
      color: "text-red-500",
    },
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogTitle className="flex gap-2">
            <p>{t("order")}</p>
            <p>{table.name}</p>
          </DialogTitle>
          <DialogDescription className="font-normal">
            {t("orderDetails")}
          </DialogDescription>
        </DialogHeader>
        {table.order && (
          <div className="flex flex-col gap-2">
            <section className="flex gap-2 w-full justify-between">
              <div className="flex h-10 bg-emerald-100 text-emerald-900 border-2 items-center border-emerald-900/15 px-3 py-1.5 rounded-full">
                <p className="text-sm font-medium">{t("tableOrder")}</p>
              </div>

              <div className="flex rtl:flex-row-reverse bg-sky-100 h-10 text-sky-900 items-center border-2 border-sky-900/15 px-3 py-1.5 rounded-full">
                <p className="font-medium text-sm">#</p>
                <p className="font-medium text-sm">{table.active_session?.code}</p>
              </div>
              {/* <div className="flex bg-sky-100 text-sky-900 border-2 border-sky-900/15 px-3 py-1.5 rounded-full">
                <p className="text-sm font-medium">سفارش آنلاین</p>
              </div> */}
            </section>
            <section className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex gap-2 flex-col flex-1 rounded-md border-2 bg-gray-50 border-primary/5 p-2">
                  <p className="text-lg">{t("orderStatus")}</p>
                  <p
                    className={`text-base font-normal ${orderStatus[table.order.status].color
                      }`}
                  >
                    {orderStatus[table.order.status].text}
                  </p>
                </div>
                <div className="flex gap-2 flex-col flex-1 rounded-md border-2 bg-gray-50 border-primary/5 p-2">
                  <p className=" text-lg">{t('orderPlaced')}</p>
                  <p className="text-base font-normal text-gray-500">
                    {t("ago", { duration: elapsedOrderDuration })}
                  </p>
                </div>
              </div>
              {/* <div className="flex gap-2">
                <div className="flex flex-col justify-between gap-2 flex-1 rounded-md border-2 bg-gray-50 border-primary/5 p-2">
                  <p className=" text-lg">طریقه پرداخت</p>
                  <p className="text-base font-normal text-blue-600">
                    حضوری
                  </p>
                </div>
                <div className="flex flex-col justify-between gap-2 flex-1 rounded-md border-2 bg-gray-50 border-primary/5 p-2">
                  <p className=" text-lg">وضعیت پرداخت</p>
                  <p className="text-base font-normal text-red-600">
                    پرداخت نشده
                  </p>
                </div>
              </div> */}
            </section>
            <div className="flex flex-col">
              <div className="flex items-center w-full gap-2 p-2">
                <p className=" text-xl font-semibold">{t('title')}</p>
              </div>
              <ul>
                {table.order.items.map((item) => (
                  <ItemRow key={item.id} item={item}></ItemRow>
                ))}
              </ul>
              <div className="flex items-center w-full gap-2 px-2 py-4">
                <p className="text-primary font-semibold text-xl">
                  {t("totalPrice")}
                </p>
                <p className="text-primary font-semibold text-xl">
                  {toPersianDigits(addCommas(table.order.total_price))}
                </p>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="secondary"
            className="hover:bg-red-500 hover:text-red-50 transition-colors duration-300"
          >
            {t("cancelOrder")}
          </Button>
          <Button className="hover:bg-green-200 bg-green-100 text-green-800 hover:text-950 transition-colors duration-300">
            {t("completeOrder")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
