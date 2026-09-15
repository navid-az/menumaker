import React from "react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function MenuLayout(props: {
  params: Promise<{ business_slug: string }>;
  children: React.ReactNode;
}) {
  return <div>{props.children}</div>;
}
