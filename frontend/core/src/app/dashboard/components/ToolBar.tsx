import React from "react";

export default function ToolBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-40 flex h-max w-full items-center justify-between gap-2 rounded-full bg-sad-blue p-2">
      {children}
    </div>
  );
}
