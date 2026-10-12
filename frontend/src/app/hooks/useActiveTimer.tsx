//hooks
import { useProgress } from "./useProgress";
import { useDeferredNow } from "./useDeferredNow";

//libraries
import { useTranslations } from "next-intl";

//types
import { type Table } from "../types/api/business";
export type progressType =
  | "call"
  | "pendingOrder"
  | "acceptedOrder"
  | "canceledOrder"
  | "readyOrder"
  | "servedOrder"
  | "session"
  | "none";

// Get table's active_call, active_session and order data
// Return progress of the alert with highest priority
export function useActiveTimer(table: Table, isInView?: boolean): {
  progress: number;
  remainingDuration: string;
  elapsedDuration: string;
  progressType: progressType;
  progressMessage: string;
  isReady: boolean
  // color: string;
} {
  const now = useDeferredNow()
  const isReady = now !== null

  const t = useTranslations('dashboard.liveManagement.liveCard.timer.progressMessages')

  const activeOrderValid = !!table.order && table.order.status != "cancelled";

  const orderIsReady = table.order?.status === "ready";
  const orderIsAccepted = table.order?.status === 'accepted'
  const orderIsCanceled = table.order?.status === 'cancelled'

  const orderIsServed =
    now !== null &&
    table.order?.served_at && new Date(table.order.served_at) < new Date(now);

  const activeCallValid =
    now !== null &&
    table.active_call?.status === "pending" &&
    (
      table.active_call.expires_at === null ||
      new Date(table.active_call.expires_at).getTime() > now
    );

  const activeSessionValid =
    now !== null &&
    table.active_session && new Date(table.active_session.expires_at) > new Date(now);

  //calculate session progress
  const {
    progress: sessionProgress,
    remainingMs: remainingSessionDuration,
    elapsedMs: elapsedSessionDuration,
  } = useProgress(
    table.active_session?.started_at || "",
    table.active_session?.expires_at || "",
    true,
    "countdown",
    undefined,
    isInView
  );

  //calculate waiter call progress
  const {
    progress: waiterCallProgress,
    remainingMs: remainingWaiterDuration,
    elapsedMs: elapsedWaiterDuration,
  } = useProgress(
    table.active_call?.created_at || "",
    table.active_call?.expires_at || "",
    true,
    "countdown",
    undefined,
    isInView
  );

  //calculate order created_at progress
  const {
    progress: orderAge,
    remainingMs: remainingOrderDuration,
    elapsedMs: elapsedOrderDuration,
  } = useProgress(table.order?.created_at || "", "", false, "countup", undefined, isInView);

  //calculate order accepted_at progress
  const {
    progress: orderAccepted,
    remainingMs: remainingOrderAcceptedDuration,
    elapsedMs: elapsedOrderAcceptedDuration,
  } = useProgress(table.order?.accepted_at || "", "", false, "countup", undefined, isInView);

  //calculate order canceled_at progress
  const {
    progress: orderCanceled,
    remainingMs: remainingOrderCanceledDuration,
    elapsedMs: elapsedOrderCanceledDuration,
  } = useProgress(table.order?.cancelled_at || "", "", false, "countup", undefined, isInView);

  //calculate order ready_at progress
  const {
    progress: orderReady,
    remainingMs: remainingOrderReadyDuration,
    elapsedMs: elapsedOrderReadyDuration,
  } = useProgress(table.order?.ready_at || "", "", false, "countup", undefined, isInView);

  //calculate order served_at progress
  const {
    progress: orderServed,
    remainingMs: remainingOrderServedDuration,
    elapsedMs: elapsedOrderServedDuration,
  } = useProgress(table.order?.served_at || "", "", false, "countup", undefined, isInView);

  if (activeCallValid) {
    return {
      progress: waiterCallProgress,
      remainingDuration: remainingWaiterDuration,
      elapsedDuration: elapsedWaiterDuration,
      progressType: "call",
      progressMessage: t("call", {
        duration: elapsedWaiterDuration,
      }),
      isReady,
    };
  }

  if (orderIsCanceled) {
    return {
      progress: orderCanceled,
      remainingDuration: remainingOrderCanceledDuration,
      elapsedDuration: elapsedOrderCanceledDuration,
      progressType: "canceledOrder",
      progressMessage: t("canceledOrder", {
        duration: elapsedOrderCanceledDuration,
      }),
      isReady,
    };
  }

  if (activeOrderValid) {
    if (orderIsAccepted) {
      return {
        progress: orderAccepted,
        remainingDuration: remainingOrderAcceptedDuration,
        elapsedDuration: elapsedOrderAcceptedDuration,
        progressType: 'acceptedOrder',
        progressMessage: t("acceptedOrder", {
          duration: elapsedOrderAcceptedDuration,
        }),
        isReady,
      };
    } else if (orderIsReady) {
      return {
        progress: orderReady,
        remainingDuration: remainingOrderReadyDuration,
        elapsedDuration: elapsedOrderReadyDuration,
        progressType: "readyOrder",
        progressMessage: t("readyOrder", {
          duration: elapsedOrderReadyDuration,
        }),
        isReady,
      };
    } else if (orderIsServed) {
      return {
        progress: 100,
        remainingDuration: "",
        elapsedDuration: elapsedOrderServedDuration,
        progressType: "servedOrder",
        progressMessage: t("servedOrder", {
          duration: elapsedOrderServedDuration,
        }),
        isReady,
      };
    } else {
      return {
        progress: orderAge,
        remainingDuration: remainingOrderDuration,
        elapsedDuration: elapsedOrderDuration,
        progressType: "pendingOrder",
        progressMessage: t("pendingOrder", {
          duration: elapsedOrderDuration,
        }),
        isReady,
      };
    }
  }

  if (activeSessionValid) {
    return {
      progress: sessionProgress,
      remainingDuration: remainingSessionDuration,
      elapsedDuration: elapsedSessionDuration,
      progressType: "session",
      progressMessage: t("session", {
        duration: elapsedSessionDuration,
      }),
      isReady,
    };
  }

  return {
    progress: 0,
    remainingDuration: "",
    elapsedDuration: "",
    progressType: "none",
    progressMessage: "",
    isReady
  };
}
