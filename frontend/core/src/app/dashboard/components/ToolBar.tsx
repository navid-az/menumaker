import React from "react";

type ToolBarType = { children: React.ReactNode };

export default function ToolBar({ children }: ToolBarType) {
  return (
    <div className="flex h-max w-full items-center justify-between gap-2 rounded-full bg-sad-blue p-2">
      {children}
    </div>
  );
}
