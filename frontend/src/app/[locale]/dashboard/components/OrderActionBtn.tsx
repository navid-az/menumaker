'use client'

//components
import { Button } from "@/components/ui/button";

//functions
import { cn } from "@/lib/utils";
import { handleOrderAction } from "../utils/handleOrderAction";

//libraries
import { useTranslations } from "next-intl";

//types 
import { type progressType } from "@/app/hooks/useActiveTimer";
import { type Table } from "@/app/types/api/business";
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

  return (
    <>
      {orderActionLabel && (
        <Button
          onClick={() => handleOrderAction(table, progressType, "accepted", onPaymentCompleted)}
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
