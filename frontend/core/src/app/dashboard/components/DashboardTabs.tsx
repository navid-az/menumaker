import React from "react";

//components
import { Tabs, TabsList } from "@/components/ui/tabs";

function DashboardTabs({
  dir,
  children,
}: {
  dir?: "ltr" | "rtl";
  children: React.ReactNode;
}) {
  return (
    <Tabs className="h-full" dir={dir} defaultValue="items">
      <TabsList className="rounded-full border-2 border-primary bg-soft-blue">
        {children}
      </TabsList>
    </Tabs>
  );
}

export default DashboardTabs;
