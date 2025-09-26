//types
import { MenuGlobalStyling } from "../menu/page";

export function getStyleVars(config: MenuGlobalStyling): React.CSSProperties {
  return {
    "--primary": config.primary_color,
    "--secondary": config.secondary_color,
    "--tertiary": config.tertiary_color,
    "--bg": config.bg_color,
    "--radius-base":
      config.border_radius === "sm"
        ? "4px"
        : config.border_radius === "md"
        ? "6px"
        : config.border_radius === "lg"
        ? "8px"
        : "9999px", // full
    "--radius-inner":
      config.border_radius === "sm"
        ? "2px"
        : config.border_radius === "md"
        ? "4px"
        : config.border_radius === "lg"
        ? "6px"
        : "9999px", // full,
    "--radius-exception":
      config.border_radius === "sm"
        ? "2px"
        : config.border_radius === "md"
        ? "4px"
        : config.border_radius === "lg"
        ? "6px"
        : "24px", // full,
    "--radius-sm":
      config.border_radius === "sm"
        ? "0.5rem"
        : config.border_radius === "md"
        ? "1rem"
        : config.border_radius === "lg"
        ? "3rem"
        : "4rem", // full,
    "--radius-md":
      config.border_radius === "sm"
        ? "0.5rem"
        : config.border_radius === "md"
        ? "2rem"
        : config.border_radius === "lg"
        ? "5rem"
        : "7rem", // full,
    "--radius-lg":
      config.border_radius === "sm"
        ? "0.5rem"
        : config.border_radius === "md"
        ? "2rem"
        : config.border_radius === "lg"
        ? "6rem"
        : "8rem", // full,
  } as React.CSSProperties;
}
