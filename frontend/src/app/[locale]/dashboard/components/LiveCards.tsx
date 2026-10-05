"use client";

import React, { useEffect, useState, useMemo } from "react";

// components
import LiveCard from "./LiveCard";

//configs
import { getWsUrl } from "@/lib/config";

// types
import { TableType } from "../[business_slug]/[branch_slug]/liveManagement/all/page";

export default function LiveCards({
  tables,
  businessSlug,
  branchSlug,
}: {
  tables: TableType[];
  businessSlug: string;
  branchSlug: string;
}) {
  const [liveOverlay, setLiveOverlay] = useState<
    Record<
      string,
      {
        active_session?: TableType["active_session"];
        active_call?: TableType["active_call"];
        order?: TableType["order"];
      }
    >
  >({});

  // Merge the initial table data with real-time WebSocket updates.
  const mergedTables = useMemo(() => {
    if (!tables) return [];

    return tables.map((table) => {
      const overlay = liveOverlay[table.code] || {};

      return {
        ...table,
        ...overlay,
      };
    });
  }, [tables, liveOverlay]);

  useEffect(() => {
    const socket = new WebSocket(
      getWsUrl(`/ws/dashboard/${businessSlug}/${branchSlug}/`)
    );

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const { event: evt, payload } = data;

      if (evt === "create_session") {
        setLiveOverlay((prev) => ({
          ...prev,
          [payload.table_code]: {
            ...prev[payload.table_code],
            active_session: {
              code: payload.session_code,
              started_at: payload.started_at,
              expires_at: payload.expires_at,
              status: payload.status,
            },
          },
        }));
      } else if (evt === "call_waiter") {
        setLiveOverlay((prev) => ({
          ...prev,
          [payload.table_code]: {
            ...prev[payload.table_code],
            active_call: payload,
          },
        }));
      } else if (evt === "new_order") {
        setLiveOverlay((prev) => ({
          ...prev,
          [payload.table_code]: {
            ...prev[payload.table_code],
            order: payload,
          },
        }));
      } else if (evt === "update_order_status") {
        setLiveOverlay((prev) => ({
          ...prev,
          [payload.table_code]: {
            ...prev[payload.table_code],
            order: payload,
          },
        }));
      }
    };

    socket.onclose = (event) => {
      console.log(
        "WebSocket closed:",
        event.code,
        event.reason
      );
    };

    return () => {
      socket.close();
    };
  }, [businessSlug, branchSlug]);

  const handlePaymentCompleted = (tableCode: string) => {
    setLiveOverlay((prev) => ({
      ...prev,
      [tableCode]: {
        ...prev[tableCode],
        active_session: undefined,
        active_call: undefined,
        order: undefined,
      },
    }));
  };

  return (
    <div className="flex-1 rtl:flex-row-reverse items-start flex gap-4 flex-wrap">
      {mergedTables.map((table: TableType) => (
        <LiveCard
          key={table.id}
          businessSlug={businessSlug}
          branchSlug={branchSlug}
          serviceType="online"
          table={table}
          onPaymentCompleted={handlePaymentCompleted}
        />
      ))}
    </div>
  );
}