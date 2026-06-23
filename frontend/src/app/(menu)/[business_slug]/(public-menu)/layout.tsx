import React from "react";

//components
import MenuWrapper from "../components/MenuWrapper";

//configs
import { SERVER_API_BASE_URL } from "@/lib/config";

// GET menu global stylings
async function getGlobalStyling(business_slug: string) {
  try {
    let res = await fetch(
      `${SERVER_API_BASE_URL}/businesses/${business_slug}/menu/global-styling`
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
  params: Promise<{ business_slug: string }>;
  children: React.ReactNode;
}) {
  const params = await props.params;
  const globalStyling = await getGlobalStyling(params.business_slug);

  return (
    <div>
      <MenuWrapper config={globalStyling}>{props.children}</MenuWrapper>
    </div>
  );
}
