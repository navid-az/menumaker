'use client'

//components
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

//functions
import { cn } from "@/lib/utils";
import { updateOrder } from "@/app/actions/dashboard/live-management";

//libraries
import { useTranslations } from "next-intl";

//types 
import { type UpdateOrder } from "@/app/types/payloads/menu";
import { type progressType } from "@/app/hooks/useActiveTimer";
import { type TableType } from "../[business_slug]/[branch_slug]/liveManagement/all/page";

export default function OrderActionBtn({ progressType, table, showOrder }: { progressType: progressType, table: TableType, showOrder: boolean }) {
  const t = useTranslations('dashboard.liveManagement.liveCard')

  const orderActionLabels = {
    pendingOrder: t("orderList.buttons.accept"),
    acceptedOrder: t("orderList.buttons.ready"),
    readyOrder: t("orderList.buttons.served"),
  } as const;
  const orderActionLabel = orderActionLabels[progressType as keyof typeof orderActionLabels];

  async function handleUpdateOrder() {
    if (!table.order?.id) return;

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
          onClick={handleUpdateOrder}
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
