import React from "react";

export default async function MenuLayout(props: {
  params: Promise<{ business_slug: string }>;
  children: React.ReactNode;
}) {
  return <div>{props.children}</div>;
}
