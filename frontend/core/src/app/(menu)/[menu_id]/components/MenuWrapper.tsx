import React from "react";

//types
import { type MenuGlobalStyling } from "@/app/types/api/menu";

//utils
import { generateStyleVars } from "../utilities/styleVars";

export default function MenuWrapper({
  children,
  config,
}: {
  children: React.ReactNode;
  config: MenuGlobalStyling;
}) {
  const colors = [
    config.primary_color,
    config.secondary_color,
    config.tertiary_color,
    config.bg_color,
  ];
  const styleVars = generateStyleVars(colors, config.border_radius);

  return (
    <div
      className="h-screen bg-(--bg)"
      style={styleVars as React.CSSProperties}
    >
      {children}
    </div>
  );
}
