import React from "react";

export default function DataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-4">{children}</div>;
}
