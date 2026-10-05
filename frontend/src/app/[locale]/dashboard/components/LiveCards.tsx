"use client";

import React, { useEffect, useState, useMemo } from "react";

// components
import LiveCard from "./LiveCard";
import SocketStatus from "./SocketStatus";

//configs
import { getWsUrl } from "@/lib/config";

// types
import { type Table } from "@/app/types/api/business";

export default function LiveCards({
  tables,
  businessSlug,
  branchSlug,
}: {
  tables: Table[];
  businessSlug: string;
  branchSlug: string;
}) {
  const [liveOverlay, setLiveOverlay] = useState<
    Record<
      string,
      {
        active_session?: Table["active_session"];
        active_call?: Table["active_call"];
        order?: Table["order"];
      }
    >
  >({});
  const [socketStatus, setSocketStatus] = useState<"connecting" | "connected" | "disconnected">("connecting");

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
    let socket: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    let shouldReconnect = true;

    const connect = () => {
      socket = new WebSocket(
        getWsUrl(`/ws/dashboard/${businessSlug}/${branchSlug}/`)
      );

      socket.onopen = () => {
        setSocketStatus("connected");
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
        setSocketStatus("disconnected");
        console.log(
          "WebSocket closed:",
          event.code,
          event.reason
        );

        if (!shouldReconnect) return;

        console.log("Attempting to reconnect...");

        reconnectTimeout = setTimeout(() => {
          connect();
        }, 3000);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        socket?.close();
      };
    };

    connect();

    return () => {
      shouldReconnect = false;

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      socket?.close();
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
    <div className="relative flex-1 rtl:flex-row-reverse">
      <SocketStatus status={socketStatus} />
      <div className="flex gap-4 flex-1 rtl:flex-row-reverse items-start flex gap-2 flex-wrap">
        {mergedTables.map((table: Table) => (
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
    </div>
  );
}