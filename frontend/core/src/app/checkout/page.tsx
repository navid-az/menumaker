import React from "react";
import CheckoutForm from "./components/CheckoutForm";

export default async function ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  return (
    <div className="flex justify-center items-center h-screen w-screen px-2 md:px-4">
      <CheckoutForm searchParams={searchParams}></CheckoutForm>
    </div>
  );
}
