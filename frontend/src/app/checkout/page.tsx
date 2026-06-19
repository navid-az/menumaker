import React from "react";
import SubscriptionCheckout from "./components/SubscriptionCheckout";

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
