import React from "react";

//components
import MenuWrapper from "./components/MenuWrapper";

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

  return <MenuWrapper config={globalStyling}>{props.children}</MenuWrapper>;
}
