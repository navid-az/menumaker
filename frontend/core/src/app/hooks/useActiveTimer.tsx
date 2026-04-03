//hooks
import { useProgress } from "./useProgress";

//types
import { type TableType } from "../dashboard/[business_slug]/[branch_slug]/liveManagement/all/page";
export type progressType =
  | "call"
  | "pendingOrder"
  | "readyOrder"
  | "servedOrder"
  | "session"
  | "none";

// Get table's active_call, active_session and order data
// Return progress of the alert with highest priority
export function useActiveTimer(table: TableType): {
  progress: number;
  remainingDuration: string;
  elapsedDuration: string;
  progressType: progressType;
  progressMessage: string;
  // color: string;
} {
  const now = new Date();

  const activeOrderValid = !!table.order && table.order.status != "cancelled";

  const orderIsReady = table.order?.status === "ready";

  const orderIsServed =
    table.order?.served_at && new Date(table.order.served_at) < now;

  const activeCallValid =
    table.active_call &&
    !table.active_call.resolved &&
    new Date(table.active_call.expires_at) > now;

  const activeSessionValid =
    table.active_session && new Date(table.active_session.expires_at) > now;

  //calculate session progress
  const {
    progress: sessionProgress,
    remainingMs: remainingSessionDuration,
    elapsedMs: elapsedSessionDuration,
  } = useProgress(
    table.active_session?.started_at || "",
    table.active_session?.expires_at || "",
    true,
    "countdown"
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
    "countdown"
  );

  //calculate order created_at progress
  const {
    progress: orderAge,
    remainingMs: remainingOrderDuration,
    elapsedMs: elapsedOrderDuration,
  } = useProgress(table.order?.created_at || "", "", false, "countup");

  //calculate order ready_at progress
  const {
    progress: orderReady,
    remainingMs: remainingOrderReadyDuration,
    elapsedMs: elapsedOrderReadyDuration,
  } = useProgress(table.order?.ready_at || "", "", false, "countup");

  //calculate order served_at progress
  const {
    progress: orderServed,
    remainingMs: remainingOrderServedDuration,
    elapsedMs: elapsedOrderServedDuration,
  } = useProgress(table.order?.served_at || "", "", false, "countup");

  if (activeCallValid) {
    return {
      progress: waiterCallProgress,
      remainingDuration: remainingWaiterDuration,
      elapsedDuration: elapsedWaiterDuration,
      progressType: "call",
      progressMessage: `مشتری ${elapsedWaiterDuration} پیش صدا زده`,
    };
  }

  if (activeOrderValid) {
    if (orderIsReady) {
      return {
        progress: orderReady,
        remainingDuration: remainingOrderReadyDuration,
        elapsedDuration: elapsedOrderReadyDuration,
        progressType: "readyOrder",
        progressMessage: `سفارش ${elapsedOrderReadyDuration} پیش آماده شده`,
      };
    } else if (orderIsServed) {
      return {
        progress: 100,
        remainingDuration: "",
        elapsedDuration: elapsedOrderServedDuration,
        progressType: "servedOrder",
        progressMessage: `سفارش ${elapsedOrderServedDuration} پیش سرور شد`,
      };
    } else {
      return {
        progress: orderAge,
        remainingDuration: remainingOrderDuration,
        elapsedDuration: elapsedOrderDuration,
        progressType: "pendingOrder",
        progressMessage: `مشتری ${elapsedOrderDuration} پیش سفارش داده`,
      };
    }
  }

  if (activeSessionValid) {
    return {
      progress: sessionProgress,
      remainingDuration: remainingSessionDuration,
      elapsedDuration: elapsedSessionDuration,
      progressType: "session",
      progressMessage: `مشتری ${elapsedSessionDuration} پیش اسکن کرده`,
    };
  }

  return {
    progress: 0,
    remainingDuration: "",
    elapsedDuration: "",
    progressType: "none",
    progressMessage: "",
  };
}
