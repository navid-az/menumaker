//hooks
import { useProgress } from "./useProgress";

//types
import { type TableType } from "../dashboard/[business_slug]/[branch_slug]/liveManagement/all/page";

// Get table's active_call, active_session and order data
// Return progress of the alert with highest priority
export function useActiveTimer(table: TableType): {
  progress: number;
  remainingDuration: string;
  elapsedDuration: string;
  progressType: "call" | "order" | "session" | "none";
  // color: string;
} {
  const now = new Date();

  const activeOrderValid = !!table.order;

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

  //calculate order age progress
  const {
    progress: orderAge,
    remainingMs: remainingOrderDuration,
    elapsedMs: elapsedOrderDuration,
  } = useProgress(table.order?.created_at || "", "", false, "countup");

  if (activeCallValid) {
    return {
      progress: waiterCallProgress,
      remainingDuration: remainingWaiterDuration,
      elapsedDuration: elapsedWaiterDuration,
      progressType: "call",
      // color: "var(--urgent-call)",
    };
  }

  if (activeOrderValid) {
    return {
      progress: orderAge,
      remainingDuration: remainingOrderDuration,
      elapsedDuration: elapsedOrderDuration,
      progressType: "order",
      // color: "var(--order-age)",
    };
  }

  if (activeSessionValid) {
    return {
      progress: sessionProgress,
      remainingDuration: remainingSessionDuration,
      elapsedDuration: elapsedSessionDuration,
      progressType: "session",
      // color: "var(--session)",
    };
  }

  return {
    progress: 0,
    remainingDuration: "",
    elapsedDuration: "",
    progressType: "none",
    // color: "var(--neutral)",
  };
}
