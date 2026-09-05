import React from "react";
import SubscriptionCheckout from "./components/SubscriptionCheckout";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    business: string;
    plan: string;
    duration: number;
  }>;
}) {
  return (
    <div className="flex justify-center items-center h-screen w-screen px-2 md:px-4">
      <SubscriptionCheckout searchParams={searchParams}></SubscriptionCheckout>
    </div>
  );
}
