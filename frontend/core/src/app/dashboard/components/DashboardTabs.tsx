"use client";

import React from "react";

//components
import { Button } from "@/components/ui/button";
import Link from "next/link";

//hooks
import { usePathname } from "next/navigation";

export function DashboardTabs({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-11 items-center justify-between rounded-full border-2 border-primary bg-soft-blue p-1">
      {children}
    </div>
  );
}

export function DashboardTabsTrigger({
  path = "/",
  title,
  disabled,
}: {
  path?: string;
  title: string;
  disabled?: boolean;
}) {
  //get last part of url(current route name)
  const pathname = usePathname();
  const parts = pathname.split("/");
  const currentRoute = parts[parts.length - 1];

  return (
    <Button
      asChild
      className={`${disabled && "pointer-events-none opacity-50"} ${
        path == currentRoute
          ? "bg-primary text-primary-foreground"
          : "bg-inherit text-primary"
      } scale-pro inline-flex h-full select-none items-center justify-center whitespace-nowrap rounded-full px-4 text-base ring-offset-background transition-all duration-200 hover:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm`}
    >
      <Link href={path}>{title}</Link>
    </Button>
  );
}
