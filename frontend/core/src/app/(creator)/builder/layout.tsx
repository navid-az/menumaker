import React from "react";

export default function MenuBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container m-auto flex h-screen w-full items-center justify-between gap-12 overflow-hidden">
      {children}
    </section>
  );
}
