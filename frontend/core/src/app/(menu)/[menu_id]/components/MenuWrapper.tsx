import React from "react";

//types
import { type MenuGlobalStyling } from "@/app/types/api/menu";

//utils
import { getStyleVars } from "../utilities/styleVars";

export default function MenuWrapper({
  children,
  config,
}: {
  children: React.ReactNode;
  config: MenuGlobalStyling;
}) {
  const styleVars = getStyleVars(config);

  return (
    <div
      className="h-screen bg-(--bg)"
      style={styleVars as React.CSSProperties}
    >
      {children}
    </div>
  );
}
