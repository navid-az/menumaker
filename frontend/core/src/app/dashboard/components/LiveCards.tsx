"use client";

import React, { useEffect, useState, useMemo } from "react";

// components
import LiveCard from "./LiveCard";

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
      }
    >
  >({});

  // merge tables with live overlay data
  // this will overwrite the active_session and active_call fields with the latest data from liveOverlay
  const mergedTables = useMemo(() => {
    if (!tables) return [];
    return tables.map((table) => {
      const overlay = liveOverlay[table.code] || {};
      return {
        ...table,
        ...overlay, // overwrite only active_session and active_call
      };
    });
  }, [tables, liveOverlay]);

  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/dashboard/${businessSlug}/${branchSlug}/`
    );
    socket.onopen = () => {
      console.log("connection established");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const { event: evt, payload } = data;

      if (evt === "create_session") {
        setLiveOverlay((prev) => ({
          ...prev,
          [payload.code]: {
            ...prev[payload.code],
            active_session: payload,
          },
        }));
      } else if (evt === "call_waiter") {
        setLiveOverlay((prev) => ({
          ...prev,
          [payload.code]: {
            ...prev[payload.code],
            active_call: payload,
          },
        }));
      }
    };

    return () => socket.close();
  }, [branchSlug]);

  return (
    <div className="flex gap-4 flex-wrap justify-end">
      {mergedTables.map((table: TableType) => (
        <LiveCard
          businessSlug={businessSlug}
          branchSlug={branchSlug}
          type="online"
          table={table}
          key={table.id}
        ></LiveCard>
      ))}
    </div>
  );
}
