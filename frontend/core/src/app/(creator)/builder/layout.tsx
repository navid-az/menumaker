import React from "react";
import Image from "next/image";

export default function MenuBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden bg-white">
      {/* form and prototype  */}
      {/* px-40 container mx-auto */}
      <div className=" flex h-screen justify-between ">{children}</div>
    </section>
  );
}
