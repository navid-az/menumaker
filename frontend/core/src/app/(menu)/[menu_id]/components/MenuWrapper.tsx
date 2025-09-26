import React from "react";

//types
import { MenuGlobalStyling } from "../menu/page";

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

  return <div style={styleVars as React.CSSProperties}>{children}</div>;
}
