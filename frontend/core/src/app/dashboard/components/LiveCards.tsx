"use client";

import React, { useEffect, useState } from "react";

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
  const [allTables, setAllTables] = useState(tables);

  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/ws/dashboard/${businessSlug}/${branchSlug}/`
    );
    socket.onopen = () => {
      console.log("connection established");
    };

    socket.onmessage = (event) => {
      console.log("onMessage");

      const data = JSON.parse(event.data);
      console.log("Update from server:", data);

      // Example: update a table’s state
      console.log({ ...data.payload });

      setAllTables((prev) =>
        prev.map((table) =>
          table.code === data.payload.code
            ? { ...table, active_session: { ...data.payload } }
            : table
        )
      );
    };

    return () => socket.close();
  }, [branchSlug]);

  return (
    <div className="flex gap-4">
      {allTables.map((table: TableType) => (
        <LiveCard type="online" table={table} key={table.id}></LiveCard>
      ))}
    </div>
  );
}
