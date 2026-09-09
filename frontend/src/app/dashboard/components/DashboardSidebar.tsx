"use client";

import { useRef, useState, Suspense } from "react";

//hooks
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { useQuery } from "@tanstack/react-query";

//libraries
import { cn } from "@/lib/utils";
import { ImperativePanelHandle } from "react-resizable-panels";

//components
import Link from "next/link";
import { ResizablePanel } from "@/components/ui/resizable";
import Logo from "@/components/global/Logo";
import SidebarNav from "./SidebarNav";
import MyBusinessesTab from "./MyBusinessesTab";
import BusinessSelectorSkeleton from "@/app/components/skeletons/BusinessSelectorSkeleton";
import SidebarNavSkeleton from "@/app/components/skeletons/SidebarNavSkeleton";

//types
import { type Business } from "@/app/types/api/business";

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const md = useMediaQuery("(min-width: 768px)");
  const lg = useMediaQuery("(min-width: 1024px)");
  const resizablePanel = useRef<ImperativePanelHandle>(null);

  const { data: businesses, isLoading } = useQuery({
    queryKey: ["businesses"],
    queryFn: () => fetch("/api/businesses").then((r) => r.json() as Promise<Business[]>),
  });

  const collapsePanel = () => {
    resizablePanel.current?.expand();
  };

  return (
    <ResizablePanel
      className="transition-all duration-300"
      ref={resizablePanel}
      onCollapse={() => setIsCollapsed(true)}
      collapsible
      collapsedSize={lg ? 6 : md ? 9.5 : 20}
      minSize={lg ? 19 : md ? 25 : 16}
      maxSize={lg ? 23 : md ? 30 : 25}
      defaultSize={lg ? 20 : md ? 28 : 20}
      onExpand={() => setIsCollapsed(false)}
    >
      <section className="flex w-full flex-col items-end bg-primary text-soft-blue px-2">
        <div
          className={cn(
            "w-full flex p-4 transition-all duration-300",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <Link
            className={cn(
              "transition-all relative duration-300",
              isCollapsed ? "w-10 h-10" : "w-32 h-10"
            )}
            href="/"
          >
            <Logo primary="#edfdff" secondary="#94d9e2" full={!isCollapsed} />
          </Link>
        </div>
        <div className="flex flex-col mt-4 gap-4 w-full">
          {isLoading ? (
            <BusinessSelectorSkeleton isCollapsed={isCollapsed} />
          ) : (
            <MyBusinessesTab
              businesses={businesses ?? []}
              position="صاحب مجموعه"
              isCollapsed={isCollapsed}
              collapsePanel={collapsePanel}
            />
          )}
          <Suspense fallback={<SidebarNavSkeleton isCollapsed={isCollapsed} isLoading={isLoading} />}>
            <SidebarNav
              isCollapsed={isCollapsed}
            />
          </Suspense>
        </div>
      </section>
    </ResizablePanel>
  );
}


