//components
import React from "react";

// GET menu global stylings
export async function getGlobalStyling(menu_id: string) {
  try {
    let res = await fetch(
      `http://127.0.0.1:8000/menu/${menu_id}/global-styling/`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error fetching data:", error);
  }
}

export default async function MenuLayout(props: {
  params: Promise<{ menu_id: string }>;
  children: React.ReactNode;
}) {
  const params = await props.params;
  const globalStyling = await getGlobalStyling(params.menu_id);

  const styleVars = {
    "--primary": globalStyling.primary_color,
    "--secondary": globalStyling.secondary_color,
    "--tertiary": globalStyling.tertiary_color,
    "--bg": globalStyling.bg_color,
    "--radius-base":
      globalStyling.border_radius === "sm"
        ? "4px"
        : globalStyling.border_radius === "md"
        ? "6px"
        : globalStyling.border_radius === "lg"
        ? "8px"
        : "9999px", // full
    "--radius-inner":
      globalStyling.border_radius === "sm"
        ? "2px"
        : globalStyling.border_radius === "md"
        ? "4px"
        : globalStyling.border_radius === "lg"
        ? "6px"
        : "9999px", // full,
    "--radius-exception":
      globalStyling.border_radius === "sm"
        ? "2px"
        : globalStyling.border_radius === "md"
        ? "4px"
        : globalStyling.border_radius === "lg"
        ? "6px"
        : "24px", // full,
  };

  return <div style={styleVars as React.CSSProperties}>{props.children}</div>;
}
