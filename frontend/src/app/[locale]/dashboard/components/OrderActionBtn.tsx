'use client'

//components
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

//functions
import { cn } from "@/lib/utils";
import { createPayment, updateOrder } from "@/app/actions/dashboard/live-management";

//libraries
import { useTranslations } from "next-intl";

//types 
import { type UpdateOrder } from "@/app/types/payloads/menu";
import { type progressType } from "@/app/hooks/useActiveTimer";
import { type Table } from "@/app/types/api/business";
import React from "react";
type OrderActionBtnProps = {
  progressType: progressType
  table: Table
  showOrder: boolean
  onPaymentCompleted: (tableCode: string) => void
}

export default function OrderActionBtn({ progressType, table, showOrder, onPaymentCompleted }: OrderActionBtnProps) {
  const t = useTranslations('dashboard.liveManagement.liveCard')

  const orderActionLabels = {
    pendingOrder: t("orderList.buttons.accept"),
    acceptedOrder: t("orderList.buttons.ready"),
    readyOrder: t("orderList.buttons.served"),
    servedOrder: t('orderList.buttons.paid')
  } as const;
  const orderActionLabel = orderActionLabels[progressType as keyof typeof orderActionLabels];

  async function handleUpdateOrder(e: React.MouseEvent) {
    if (!table.order?.id) return;

    e.stopPropagation()

    let data: Partial<UpdateOrder> = {};

    if (progressType === "pendingOrder") {
      data = {
        status: "accepted",
        ready_at: new Date().toISOString(),
      }
    } else if (progressType === 'acceptedOrder') {
      data = {
        status: "ready",
        served_at: new Date().toISOString(),
      };
    }
    else if (progressType === "readyOrder") {
      data = {
        status: "served",
        served_at: new Date().toISOString(),
      };
    }

    else if (progressType === "servedOrder") {
      if (!table.active_session) return

      const data = {
        amount: table.order.total_price,
        method: "cash",
      };

      const res = await createPayment(
        table.active_session?.code,
        data
      );

      if (res.success && res.paymentData?.status === "successful") {
        onPaymentCompleted(table.code);
      }
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
    <>
      {orderActionLabel && (
        <Button
          onClick={e => handleUpdateOrder(e)}
          className="absolute left-1/2 top-1/2 hidden size-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-300 font-semibold text-green-950 transition-all duration-300 group-hover:flex"
        >
          <p
            className={cn(
              "font-semibold transition-all duration-300",
              showOrder ? "text-sm" : "text-2xl"
            )}
          >
            {orderActionLabel}
          </p>
        </Button>
      )}</>
  )
}
