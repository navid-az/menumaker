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

export function OrderList({ table }: { table: TableType }) {
  return (
    <div className="w-full h-max">
      <div className="w-full flex p-2">
        <p className="text-primary">لیست سفارشات</p>
      </div>
      {table.order?.items.slice(0, 2).map((orderItem) => (
        <div
          key={orderItem.id}
          className="flex items-center w-full gap-2 p-2 border-b-1 border-primary/10 last-of-type:border-dashed"
        >
          <div className="flex items-end mt-1">
            <span className="text-primary">x</span>
            <p className="text-primary font-medium">{orderItem.quantity}</p>
          </div>
          <p className="text-primary font-medium">{orderItem.name_snapshot}</p>
        </div>
      ))}
      {table.order && table.order?.items.length > 3 && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-inherit text-primary hover:bg-gray-200 text-base justify-start px-2">
              <div className="flex items-end mt-1">
                <span className="text-primary font-medium">+</span>
                <p className="text-primary font-medium">
                  {table.order.items.length - 2}
                </p>
              </div>
              <p className="text-primary font-medium">آیتم دیگر</p>
            </Button>
          </DialogTrigger>
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
            <div className="flex flex-col gap-2">
              <p className=" text-xl font-semibold">لیست سفارشات</p>
              <div className="flex flex-col">
                {table.order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center w-full gap-2 p-2 border-b-1 border-primary/10 last-of-type:border-dashed"
                  >
                    <div className="flex items-end mt-1">
                      <span className="text-primary">x</span>
                      <p className="text-primary font-medium">
                        {item.quantity}
                      </p>
                    </div>
                    <p className="text-primary font-medium">
                      {item.name_snapshot}
                    </p>
                  </div>
                ))}
                <div className="flex items-center w-full gap-2 px-2 py-4">
                  <p className="text-primary font-semibold text-xl">
                    مجموع قیمت
                  </p>
                  <p className="text-primary font-semibold text-xl">
                    {toPersianDigits(addCommas(table.order.total_price))}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="secondary"
                className="hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                لغو سفارش
              </Button>
              <Button className="bg-green-300 text-green-900">
                تکمیل سفارش
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {/* <div className="flex justify-between p-2 text-primary">
        <p>مجموع</p>
        <PriceTag size="sm" price={Number(orderData.total_price)}></PriceTag>
      </div> */}
    </div>
  );
}

function ItemRow() {
  return <div className="w-full p-2"></div>;
}
