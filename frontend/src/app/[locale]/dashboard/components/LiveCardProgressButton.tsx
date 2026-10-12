'use client'

//components
import { Button } from "@/components/ui/button";

//hooks
import { useTransition } from "react";

//functions
import { cn } from "@/lib/utils";
import { handleOrderAction } from "../utils/handleOrderAction";

//actions
import { resolveServiceRequest } from "@/app/actions/menu/service-request";

//libraries
import { useTranslations } from "next-intl";

//types 
import { type progressType } from "@/app/hooks/useActiveTimer";
import { type Table } from "@/app/types/api/business";
type LiveCardProgressButtonProps = {
  progressType: progressType;
  table: Table;
  showOrder: boolean;
  onPaymentCompleted: (tableCode: string) => void;
};

export default function LiveCardProgressButton({
  progressType,
  table,
  showOrder,
  onPaymentCompleted,
}: LiveCardProgressButtonProps) {
  const t = useTranslations("dashboard.liveManagement.liveCard");
  const [isResolving, startResolving] = useTransition();

  const activeCall = table.active_call;

  const orderActionLabels = {
    pendingOrder: t("orderList.buttons.accept"),
    acceptedOrder: t("orderList.buttons.ready"),
    readyOrder: t("orderList.buttons.served"),
    servedOrder: t("orderList.buttons.paid"),
  } as const;

  const orderActionLabel =
    orderActionLabels[progressType as keyof typeof orderActionLabels];

  function handleResolveServiceRequest() {
    if (!activeCall || isResolving) return;

    startResolving(async () => {
      const result = await resolveServiceRequest(activeCall.id);

      if (!result.success) {
        console.error(result.error);
        return;
      }
    });
  }

  if (progressType === 'call') {
    return (
      <Button
        disabled={isResolving}
        onClick={handleResolveServiceRequest}
        className="absolute left-1/2 top-1/2 hidden size-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300 font-semibold text-blue-950 transition-all duration-300 group-hover/progress:flex"
      >
        <p
          className={cn(
            "font-semibold transition-all duration-300",
            showOrder ? "text-sm" : "text-xl",
          )}
        >
          {isResolving
            ? t("orderList.buttons.resolving")
            : t("orderList.buttons.resolve")}
        </p>
      </Button>
    );
  }

  if (!table.order || !orderActionLabel) {
    return null;
  }

  return (
    <Button
      onClick={() =>
        handleOrderAction(
          table,
          progressType,
          "accepted",
          onPaymentCompleted,
        )
      }
      className="absolute left-1/2 top-1/2 hidden size-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-300 font-semibold text-green-950 transition-all duration-300 group-hover/progress:flex"
    >
      <p
        className={cn(
          "font-semibold transition-all duration-300",
          showOrder ? "text-sm" : "text-2xl",
        )}
      >
        {orderActionLabel}
      </p>
    </Button>
  );
}