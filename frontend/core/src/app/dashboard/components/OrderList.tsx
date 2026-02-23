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

//types
import { type TableType } from "../[business_slug]/[branch_slug]/liveManagement/all/page";
import {
  addCommas,
  toPersianDigits,
} from "@/app/(menu)/[business_slug]/utilities/formatCurrency";
import { OrderItem } from "@/app/types/api/menu";
import { cn } from "@/lib/utils";

const orderStatus = {
  pending: {
    text: "در انتظار تأیید",
    color: "text-yellow-500",
  },
  accepted: {
    text: "تأیید شده",
    color: "text-green-500",
  },
  preparing: {
    text: "در حال آماده‌سازی",
    color: "text-orange-500",
  },
  ready: {
    text: "آماده تحویل",
    color: "text-blue-500",
  },
  served: {
    text: "تحویل شده",
    color: "text-green-500",
  },
  cancelled: {
    text: "لغو شده",
    color: "text-red-500",
  },
};

export function OrderList({
  table,
  elapsedDuration,
}: {
  table: TableType;
  elapsedDuration: string;
}) {
  return (
    <div className="w-full h-max">
      <div className="w-full flex p-2">
        <p className="text-primary">لیست سفارشات</p>
      </div>
      <ul>
        {table.order?.items.slice(0, 3).map((orderItem) => (
          <ItemRow key={orderItem.id} item={orderItem}></ItemRow>
        ))}
      </ul>
      {table.order && table.order?.items.length > 3 && (
        <OrderDataDialog table={table} elapsedDuration={elapsedDuration}>
          <Button
            size="lg"
            className="scale-pro w-full text-primary bg-gray-100 border-2 border-primary/40 hover:scale-95 hover:bg-primary hover:text-white justify-center text-base rounded-full mt-[5px] transition-all duration-200"
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
      key={item.id}
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
  elapsedDuration,
}: {
  children: React.ReactNode;
  table: TableType;
  elapsedDuration: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogTitle className="flex gap-2">
            <p>سفارش</p>
            <p>{table.name}</p>
          </DialogTitle>
          <DialogDescription className="font-normal">
            مشخصات سفارش
          </DialogDescription>
        </DialogHeader>
        {table.order && (
          <div className="flex flex-col gap-2">
            <section className="flex gap-2 w-full justify-between">
              <div className="flex h-10 bg-emerald-100 text-emerald-900 border-2 items-center border-emerald-900/15 px-3 py-1.5 rounded-full">
                <p className="text-sm font-medium">سفارش پشت میز</p>
              </div>

              <div className="flex bg-sky-100 h-10 text-sky-900 items-center border-2 border-sky-900/15 px-3 py-1.5 rounded-full">
                <p className="text-sm font-medium pt-[1px]">
                  {table.active_session?.code}#
                </p>
              </div>
              {/* <div className="flex bg-sky-100 text-sky-900 border-2 border-sky-900/15 px-3 py-1.5 rounded-full">
                <p className="text-sm font-medium">سفارش آنلاین</p>
              </div> */}
            </section>
            <section className="flex gap-2">
              <div className="flex gap-2 flex-col flex-1 rounded-md border-2 bg-gray-50 border-primary/5 p-4">
                <p className="text-lg">وضعیت سفارش</p>
                <p
                  className={`text-base font-normal ${
                    orderStatus[table.order.status].color
                  }`}
                >
                  {orderStatus[table.order.status].text}
                </p>
              </div>
              <div className="flex gap-2 flex-col flex-1 rounded-md border-2 bg-gray-50 border-primary/5 p-4">
                <p className=" text-lg">ثبت سفارش</p>
                <p className="text-base font-normal text-gray-500">
                  {elapsedDuration} پیش
                </p>
              </div>
            </section>
            <div className="flex flex-col">
              <div className="flex items-center w-full gap-2 p-2">
                <p className=" text-xl font-semibold">لیست سفارشات</p>
              </div>
              <ul>
                {table.order.items.map((item) => (
                  <ItemRow key={item.id} item={item}></ItemRow>
                ))}
              </ul>
              <div className="flex items-center w-full gap-2 px-2 py-4">
                <p className="text-primary font-semibold text-xl">مجموع قیمت</p>
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
            لغو سفارش
          </Button>
          <Button className="hover:bg-green-200 bg-green-100 text-green-800 hover:text-950 transition-colors duration-300">
            تکمیل سفارش
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
