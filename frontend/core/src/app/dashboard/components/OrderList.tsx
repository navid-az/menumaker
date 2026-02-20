import React from "react";

//type
import { Order } from "@/app/types/api/menu";
import PriceTag from "@/app/(menu)/[business_slug]/(public-menu)/menu/components/PriceTag";

export function OrderList({ orderData }: { orderData: Order }) {
  return (
    <div className="w-full h-full">
      <div className="w-full flex p-2">
        <p className="text-primary">لیست سفارشات</p>
      </div>
      {orderData.items.map((orderItem) => (
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
